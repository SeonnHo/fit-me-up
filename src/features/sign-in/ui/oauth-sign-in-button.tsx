import { Button } from '@/shared/ui/button';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { LiteralUnion, signIn } from 'next-auth/react';
import Image from 'next/image';

interface SignInOAuthProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  children: React.ReactNode;
  provider: LiteralUnion<BuiltInProviderType>;
}

export const OAuthSignInButton = ({
  src,
  alt,
  width,
  height,
  className,
  children,
  provider,
}: SignInOAuthProps) => {
  const handleClick = async () => {
    await signIn(provider, {
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <Button type="button" className={className} onClick={handleClick}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="mr-2"
      />
      {children}
    </Button>
  );
};
