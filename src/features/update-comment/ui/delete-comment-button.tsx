import { cn } from '@/shared/lib/tailwind-merge';
import { Button } from '@/shared/ui/button';

interface DeleteCommentButtonProps {
  className?: string;
}

export const DeleteCommentButton = ({
  className,
}: DeleteCommentButtonProps) => {
  return (
    <Button
      variant="ghost"
      type="button"
      className={cn(
        'text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent',
        className
      )}
    >
      삭제
    </Button>
  );
};
