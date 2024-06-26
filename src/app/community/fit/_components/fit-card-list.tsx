import FitCard from './fit-card';

export default function FitCardList() {
  const cardItemlist = [
    {
      id: 1,
      title: '따스한 핏',
      description: '2024-05-22',
      image: 'https://picsum.photos/500/600',
      content: '따스해보이지 않나요? ㅎㅎ',
      commentCount: '6',
      likeCount: '5',
    },
    {
      id: 2,
      title: '날씨 정말 좋네요',
      description: '2024-05-22',
      image: 'https://picsum.photos/500/600',
      content: '이런 날씨에 입으려고 이걸 샀지롱',
      commentCount: '0',
      likeCount: '5',
    },
    {
      id: 3,
      title: '오늘의 데일리룩!',
      description: '2024-05-22',
      image: 'https://picsum.photos/500/600',
      content: '오늘의 착장',
      commentCount: '2',
      likeCount: '3',
    },
    {
      id: 4,
      title: '이 룩 어때요?',
      description: '2024-05-22',
      image: 'https://picsum.photos/500/600',
      content: '이번에 새로 산건데 저한테 맞는지 잘 모르겠네요... ㅎㅎㅎ',
      commentCount: '4',
      likeCount: '3',
    },
    {
      id: 5,
      title: '투데이 룩이영',
      description: '2024-05-22',
      image: 'https://picsum.photos/500/600',
      content: '잇 이즈 투데이 룩 히히',
      commentCount: '1',
      likeCount: '2',
    },
  ];

  return (
    <section className="grid grid-cols-4 grid-flow-row gap-4 my-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:flex max-md:flex-col max-md:gap-5">
      {cardItemlist.map((item) => (
        <FitCard key={item.id} {...item} />
      ))}
    </section>
  );
}
