interface Props {
  params: {
    boardName: string;
  };
}

export default function BoardPage({ params }: Props) {
  return (
    <div className="h-screen flex justify-center items-center">
      {params.boardName} 페이지
    </div>
  );
}
