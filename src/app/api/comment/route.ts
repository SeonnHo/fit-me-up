import { ObjectId } from 'mongodb';
import { connectDB } from '@/shared/api/database';
import { NextRequest, NextResponse } from 'next/server';
import { getNextSequence } from '@/shared/api/get-next-sequence';
import { Post } from '@/entities/post';
import { Comment } from '@/entities/comment';

interface RequestBody {
  userId: string;
  postId: string;
  content: string;
  _id?: string;
  mentionedUser?: string;
  mentioningUser?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  const database = connectDB.db('fit_me_up');
  const commentsCollection = database.collection<Comment>('comments');

  try {
    if (postId) {
      const comments = await commentsCollection
        .find<Comment>({
          postId: { $eq: postId },
        })
        .toArray();
      return NextResponse.json(comments);
    } else {
      throw new Error('postId 파라미터가 없습니다.');
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  const database = connectDB.db('fit_me_up');
  const commentsCollection = database.collection<Comment>('comments');
  const postsCollection = database.collection<Post>('posts');

  const date = new Date();

  const body: RequestBody = await request.json();

  try {
    if (body.mentioningUser) {
      const replySequence = await getNextSequence(body._id!);
      const reply = await commentsCollection.updateOne(
        { _id: new ObjectId(body._id) },
        {
          $push: {
            replies: {
              id: replySequence,
              userId: body.userId,
              postId: body.postId,
              content: body.content,
              createAt: date,
              mentionedUser: body.mentionedUser!,
              mentioningUser: body.mentioningUser!,
            },
          },
        }
      );
      const postCommentCount = await postsCollection.findOneAndUpdate(
        { _id: new ObjectId(body.postId) },
        { $inc: { commentCount: 1 } }
      );
      console.log(postCommentCount);

      return NextResponse.json(reply);
    } else {
      const comment = await commentsCollection.insertOne({
        userId: body.userId,
        postId: body.postId,
        content: body.content,
        createAt: date,
      });
      const postCommentCount = await postsCollection.findOneAndUpdate(
        { _id: new ObjectId(body.postId) },
        { $inc: { commentCount: 1 } }
      );
      console.log(postCommentCount);

      return NextResponse.json(comment);
    }
  } catch (error) {
    throw new Error(error as string);
  }
}
