interface Props {
  params: {
    gender: string;
  };
}
export default function ManCategoryPage({ params }: Props) {
  if (params.gender === 'male' || params.gender === 'female')
    return (
      <main className="h-screen flex justify-center items-center">
        <div>{params.gender === 'male' ? '남성' : '여성'} 커뮤니티 페이지</div>
      </main>
    );
}
