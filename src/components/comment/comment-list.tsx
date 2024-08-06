import { Comment } from '@/interfaces/comment';
import { useQuery } from '@tanstack/react-query';
import CommentCard from './comment';
import React from 'react';
import { BeatLoader, FadeLoader } from 'react-spinners';

export default function CommentList({ boardId }: { boardId: string }) {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', boardId],
    queryFn: async () => {
      const data = await fetch(`/api/comment?boardId=${boardId}`, {
        method: 'GET',
      }).then((res) => res.json());
      return data;
    },
  });

  if (isLoading)
    return (
      <ul>
        <li>
          <div className="relative flex justify-center items-center">
            <BeatLoader color="black" size={10} />
          </div>
        </li>
      </ul>
    );

  return (
    <ul className="overflow-scroll">
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <React.Fragment key={comment._id as string}>
            <CommentCard
              commentId={comment._id as string}
              content={comment.content}
              userId={comment.userId}
              createAt={comment.createAt}
            />
            {comment.replies && (
              <ul className="">
                {comment.replies.map((reply) => (
                  <CommentCard
                    className="first:border-t-0 pl-6"
                    key={reply.id}
                    commentId={comment._id as string}
                    content={reply.content}
                    userId={reply.userId}
                    createAt={reply.createAt}
                    mentionedUser={reply.mentionedUser}
                    mentioningUser={reply.mentioningUser}
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
}
