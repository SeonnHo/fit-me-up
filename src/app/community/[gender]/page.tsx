interface Props {
  params: {
    gender: string;
  };
}
export default function ManCategoryPage({ params }: Props) {
  if (params.gender === 'man' || params.gender === 'woman')
    return (
      <main className="h-screen flex justify-center items-center">
        <div>{params.gender === 'man' ? '남성' : '여성'} 커뮤니티 페이지</div>
      </main>
    );
}
