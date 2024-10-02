export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center pt-[80px] max-md:pt-[60px]">
      {children}
    </div>
  );
}
