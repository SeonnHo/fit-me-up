interface FashionInfoTableProps {
  fashionInfo: {
    section: string;
    info: string;
    size: string;
  }[];
}

export const FashionInfoTable = ({ fashionInfo }: FashionInfoTableProps) => {
  return (
    <table className="w-full">
      <tbody>
        {fashionInfo.map((fashion) => (
          <tr key={fashion.section} className="border text-center flex">
            <td className="border-r w-1/5 font-bold bg-zinc-100 p-2 text-sm line-clamp-1">
              <div className="line-clamp-1 break-all text-ellipsis">
                {fashion.section}
              </div>
            </td>
            <td className="w-3/5 p-2 text-sm border-r">
              <div className="line-clamp-1 break-all text-ellipsis">
                {fashion.info}
              </div>
            </td>
            <td className="w-1/5 p-2 text-sm line-clamp-1">
              <div className="line-clamp-1 break-all text-ellipsis">
                {fashion.size}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
