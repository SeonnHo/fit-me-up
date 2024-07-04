import FitCard from './fit-card';

export default function FitCardList() {
  const cardItemlist = [
    {
      id: 1,
      createAt: new Date(),
      image: 'https://picsum.photos/500/600',
      content: '따스해보이지 않나요? ㅎㅎ',
      commentCount: '6',
      likeCount: '5',
      user: {
        _id: '3453523720',
        nickname: '노야',
      },
    },
    {
      id: 2,
      createAt: new Date(),
      image: 'https://picsum.photos/500/600',
      content: '이런 날씨에 입으려고 이걸 샀지롱',
      commentCount: '0',
      likeCount: '5',
      user: {
        _id: '3453523720',
        nickname: '왕족발',
      },
    },
    {
      id: 3,
      createAt: new Date(),
      image: 'https://picsum.photos/500/600',
      content: '오늘의 착장',
      commentCount: '2',
      likeCount: '3',
      user: {
        _id: '3453523720',
        nickname: '장충동',
      },
    },
    {
      id: 4,
      createAt: new Date(),
      image: 'https://picsum.photos/500/600',
      content: '이번에 새로 산건데 저한테 맞는지 잘 모르겠네요... ㅎㅎㅎ',
      commentCount: '4',
      likeCount: '3',
      user: {
        _id: '3453523720',
        nickname: '미요네즈',
      },
    },
    {
      id: 5,
      createAt: new Date(),
      image: 'https://picsum.photos/500/600',
      content: '잇 이즈 투데이 룩 히히',
      commentCount: '1',
      likeCount: '2',
      user: {
        _id: '3453523720',
        nickname: '선호등',
      },
    },
  ];

  return (
    <section className="grid grid-cols-3 grid-flow-row gap-4 mb-5 max-xl:grid-cols-2 max-lg:flex max-lg:flex-col">
      {cardItemlist.map((item) => (
        <FitCard key={item.id} {...item} />
      ))}
    </section>
  );
}
