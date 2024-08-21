interface BodyInfoTableProps {
  bodyInfo: {
    gender: string;
    height: number;
    weight: number;
  };
}

export const BodyInfoTable = ({ bodyInfo }: BodyInfoTableProps) => {
  const translateGender = (gender: string): string => {
    const genderMap: Record<string, string> = {
      male: '남성',
      female: '여성',
    };

    return genderMap[gender] || '미기재';
  };

  return (
    <table className="w-full">
      <tbody>
        <tr className="border text-center">
          <th className="border-r text-sm bg-zinc-100 w-1/3 p-2">성별</th>
          <th className="border-r text-sm bg-zinc-100 w-1/3 p-2">키</th>
          <th className="text-sm bg-zinc-100 w-1/3 p-2">몸무게</th>
        </tr>
        <tr className="border-x border-b text-center">
          <td className="border-r text-sm p-2">
            {translateGender(bodyInfo.gender)}
          </td>
          <td className="border-r text-sm p-2">
            {bodyInfo.height === 0 ? '미기재' : bodyInfo.height}
          </td>
          <td className="text-sm p-2">
            {bodyInfo.weight === 0 ? '미기재' : bodyInfo.weight}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
