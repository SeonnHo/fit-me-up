import { OAuthSignInButton } from '@/features/sign-in';

export const OAuthSignInList = () => {
  return (
    <div className="flex flex-col space-y-3">
      <OAuthSignInButton
        src="/kakao_logo.svg"
        alt="카카오톡 로고"
        width={18}
        height={18}
        provider="kakao"
        className="bg-[#FEE500] hover:bg-[#FEE500]/80 text-black/85 text-sm px-2 py-0 font-system"
      >
        카카오 계정으로 로그인
      </OAuthSignInButton>
      <OAuthSignInButton
        src="/naver_logo.svg"
        alt="네이버 로고"
        width={18}
        height={18}
        provider="naver"
        className="bg-[#03C75A] hover:bg-[#03C75A]/80 text-white text-sm px-2 py-0"
      >
        네이버 계정으로 로그인
      </OAuthSignInButton>
      <OAuthSignInButton
        src="/google_logo.svg"
        alt="구글 로고"
        width={18}
        height={18}
        provider="google"
        className="bg-[#FFFFFF] hover:bg-[#EEEEEE]/20 text-black text-sm px-2 py-0 shadow-sm shadow-zinc-200 font-roboto"
      >
        구글 계정으로 로그인
      </OAuthSignInButton>
    </div>
  );
};
