import { NavigationCard } from '@/wigets/navigation-card';

export default function GenderRayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-start space-x-5">
      <NavigationCard />
      <div>{children}</div>
    </div>
  );
}
