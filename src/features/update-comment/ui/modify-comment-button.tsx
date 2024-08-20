import { cn } from '@/shared/lib/tailwind-merge';
import { Button } from '@/shared/ui/button';

interface ModifyCommentButtonProps {
  className?: string;
}

export const ModifyCommentButton = ({
  className,
}: ModifyCommentButtonProps) => {
  return (
    <Button
      variant="ghost"
      type="button"
      className={cn(
        'text-xs text-zinc-400 font-bold h-auto p-0 hover:bg-transparent',
        className
      )}
    >
      수정
    </Button>
  );
};
