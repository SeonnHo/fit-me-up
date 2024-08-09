import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InsertOneResult } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/interfaces/user';
import { Board } from '@/interfaces/board';

interface RequsetBody {
  category: string;
  title?: string;
  content: string;
  user: string;
  fitInfo?: { section: string; info: string }[];
}

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const pageParam = searchParams.get('page');
  const limit = searchParams.get('limit');

  const database = connectDB.db('fit_me_up');
  const boardsCollection = database.collection<Board>('boards');

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

    const boardList = await boardsCollection
      .find<Board>({ category })
      .skip((Number(pageParam) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ _id: -1 })
      .toArray();

    const addNicknameBoards = await Promise.all(
      boardList.map(async (board) => {
        const usersCollection = database.collection<User>('users');

        const user = await usersCollection.findOne({ _id: board.user });

        if (!user) {
          throw new Error('User not found.');
        }

        return {
          ...board,
          user: { _id: user._id, nickname: user.nickname },
        };
      })
    );

    return NextResponse.json({
      boards: addNicknameBoards,
      page: Number(pageParam),
      next: boardList.length < Number(limit) ? null : true,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const boardCollection = database.collection('boards');

  const formData = await request.formData();

  try {
    const imageList: string[] = [];
    const bodyEntry = formData.get('body');
    let result: InsertOneResult | undefined;

    if (bodyEntry && bodyEntry instanceof File) {
      const text = await bodyEntry.text();
      const body: RequsetBody = JSON.parse(text);

      const category = body.category
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLocaleLowerCase();

      if (formData.has('image')) {
        for (const file of formData.getAll('image')) {
          const uuid = uuidv4();
          if (file instanceof File) {
            const fileExtension = `.${file.name.split('.').pop()}`;
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const params = {
              Bucket: process.env.AWS_BUCKET,
              Body: buffer,
              Key: `board/${category}/${uuid + fileExtension}`,
              ContentType: file.type,
            };
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
            imageList.push(uuid + fileExtension);
          }
        }
      }

      result = await boardCollection.insertOne({
        ...body,
        createAt: new Date(),
        likeCount: 0,
        commentCount: 0,
        images: imageList,
      });
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
