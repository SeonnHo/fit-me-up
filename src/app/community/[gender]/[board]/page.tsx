interface Props {
  params: {
    board: string;
  };
}

export default function BoardPage({ params }: Props) {
  return (
    <div className="h-screen flex justify-center items-center">
      {params.board} 페이지
    </div>
  );
}
