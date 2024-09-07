'use client';

import React from 'react';
import { CommentItem } from './comment-item';
import { useCommentQuery } from '@/entities/comment';
import { SkeletonCommentItem } from './skeleton-comment-item';
import { Session } from 'next-auth';
import { Prisma } from '@prisma/client';

interface CommentListProps {
  session: Session | null;
  postId: string;
  category: string;
}

type CommentWithAuthor = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        nickname: true;
      };
    };
  };
}>;

export const CommentList = ({
  session,
  postId,
  category,
}: CommentListProps) => {
  const { comments, isLoading, isFetching } = useCommentQuery(postId);

  if (isLoading || isFetching) {
    return (
      <ul className="flex justify-start items-center">
        <SkeletonCommentItem />
      </ul>
    );
  }

  const organizeComments = (comments: CommentWithAuthor[]) => {
    const rootComments: CommentWithAuthor[] = [];
    const replyComments: CommentWithAuthor[] = [];

    comments.forEach((comment) => {
      if (comment.parentId) {
        replyComments.push(comment);
      } else {
        rootComments.push(comment);
      }
    });

    return { rootComments, replyComments };
  };

  const { rootComments, replyComments } = organizeComments(comments || []);

  const renderCommentThread = (rootComment: CommentWithAuthor) => {
    const replies = replyComments.filter(
      (reply) => reply.parentId === rootComment.id
    );

    return (
      <React.Fragment key={rootComment.id}>
        <CommentItem
          postId={postId}
          category={category}
          commentId={rootComment.id}
          content={rootComment.content}
          authorId={rootComment.authorId}
          createdAt={rootComment.createdAt}
          session={session}
        />
        {replies.map((reply) => (
          <CommentItem
            key={reply.id}
            className="pl-6"
            postId={postId}
            category={category}
            commentId={reply.id}
            parentCommentId={rootComment.id}
            content={reply.content}
            authorId={reply.authorId}
            createdAt={reply.createdAt}
            mentionedUserId={reply.mentionedUserId || undefined}
            mentionedUserNickname={reply.author.nickname || undefined}
            session={session}
          />
        ))}
      </React.Fragment>
    );
  };

  return (
    <ul className="overflow-scroll">
      {rootComments.length > 0 ? (
        rootComments.map(renderCommentThread)
      ) : (
        <li className="border-t font-bold text-sm text-center py-2">
          등록된 댓글이 없습니다.
        </li>
      )}
    </ul>
  );
};
