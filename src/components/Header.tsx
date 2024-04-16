import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full h-[60px] lg:h-[80px] sticky top-0 left-0">
      <div className="flex items-center h-full lg:max-w-screen-lg mx-auto">
        <Link href={'/'}>
          <h1 className="font-bold text-xl max-lg:ml-4">FIT ME UP</h1>
        </Link>
      </div>
    </header>
  );
}
