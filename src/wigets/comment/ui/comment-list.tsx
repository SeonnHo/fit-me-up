'use client';

import React from 'react';
import { CommentItem } from './comment-item';
import { useSession } from 'next-auth/react';
import { useCommentQuery } from '@/entities/comment';
import { SkeletonCommentItem } from './skeleton-comment-item';

interface CommentListProps {
  boardId: string;
}

export const CommentList = ({ boardId }: CommentListProps) => {
  const { comments, isLoading, isFetching } = useCommentQuery(boardId);
  const { data: session } = useSession();

  if (isLoading || isFetching) {
    return (
      <ul className="flex justify-center items-center">
        <SkeletonCommentItem />
      </ul>
    );
  }

  return (
    <ul className="overflow-scroll">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <React.Fragment key={comment._id as string}>
            <CommentItem
              commentId={comment._id as string}
              content={comment.content}
              userId={comment.userId}
              createAt={comment.createAt}
              session={session}
            />
            {comment.replies && (
              <ul className="">
                {comment.replies.map((reply) => (
                  <CommentItem
                    className="first:border-t-0 pl-6"
                    key={reply.id}
                    commentId={comment._id as string}
                    content={reply.content}
                    userId={reply.userId}
                    createAt={reply.createAt}
                    mentionedUser={reply.mentionedUser}
                    session={session}
                  />
                ))}
              </ul>
            )}
          </React.Fragment>
        ))
      ) : (
        <li className="border-t font-bold text-sm text-center py-2">
          등록된 댓글이 없습니다.
        </li>
      )}
    </ul>
  );
};
