import { connectDB } from '@/lib/database';
import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { InsertOneResult } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

interface RequsetBody {
  category: string;
  title?: string;
  content: string;
  user: string;
  fitInfo?: { section: string; info: string }[];
}

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const boardCollection = database.collection('board');

  const formData = await request.formData();

  try {
    const imageList: string[] = [];

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
            Key: `board/${uuid + fileExtension}`,
            ContentType: file.type,
          };
          const command = new PutObjectCommand(params);
          await s3Client.send(command);
          imageList.push(uuid + fileExtension);
        }
      }
    }

    const bodyEntry = formData.get('body');
    let result: InsertOneResult | undefined;

    if (bodyEntry && bodyEntry instanceof File) {
      const text = await bodyEntry.text();
      const body: RequsetBody = JSON.parse(text);
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
