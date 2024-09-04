import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/shared/lib/db';

interface RequsetBody {
  category: string;
  title?: string;
  content: string;
  userId: string;
  bodyInfo?: {
    gender: string;
    height: string;
    weight: string;
  };
  fashionInfo?: {
    section: string;
    info: string;
    size: string;
  }[];
}

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const pageParam = searchParams.get('page');
  const limit = searchParams.get('limit');

  try {
    if (!category) {
      throw new Error('"category" does not have a value.');
    }

    if (!pageParam) {
      throw new Error('"pageParam" does not have a value.');
    }

    if (!limit) {
      throw new Error('"limit" does not have a value.');
    }

    const posts = await prisma.post.findMany({
      where: {
        category: category,
      },
      skip: (Number(pageParam) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        id: 'desc',
      },
      include: {
        author: {
          select: {
            nickname: true,
            profileImageUrl: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return NextResponse.json({
      posts: posts,
      page: Number(pageParam),
      next: posts.length < Number(limit) ? null : true,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  try {
    const imageUrlList: string[] = [];
    const bodyEntry = formData.get('body');

    if (bodyEntry && bodyEntry instanceof File) {
      const text = await bodyEntry.text();
      const body: RequsetBody = JSON.parse(text);

      const category = body.category
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLocaleLowerCase();

      if (formData.has('files')) {
        for (const file of formData.getAll('files')) {
          const uuid = uuidv4();
          if (file instanceof File) {
            const fileExtension = `.${file.name.split('.').pop()}`;
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const params = {
              Bucket: process.env.AWS_BUCKET,
              Body: buffer,
              Key: `post/${category}/${uuid + fileExtension}`,
              ContentType: file.type,
            };
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
            imageUrlList.push(uuid + fileExtension);
          }
        }
      }

      console.log('imageUrlList: ', imageUrlList);
      console.log('body: ', body);

      if (body.category === 'todayFit') {
        const result = await prisma.post.create({
          data: {
            category: body.category,
            title: null,
            content: body.content,
            imageUrls: imageUrlList,
            bodyInfo: body.bodyInfo,
            fashionInfo: body.fashionInfo,
            author: { connect: { id: body.userId } },
          },
        });

        console.log('result: ', result);

        return NextResponse.json(result);
      }

      const result = await prisma.post.create({
        data: {
          category: body.category,
          title: body.title,
          content: body.content,
          imageUrls: imageUrlList,
          author: { connect: { id: body.userId } },
        },
      });

      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
