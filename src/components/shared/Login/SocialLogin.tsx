'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import { doSocialLogin } from '@/app/actions/auth.actions';
const GoogleIcon = '/icons/google.svg';
const GithubIcon = '/icons/github.svg';

const SocialLogins = () => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  console.log('theme', theme);

  return (
    <form action={doSocialLogin}>
      <button
        className="hover:bg-accent m-1 rounded-md p-1 transition-all duration-200"
        type="submit"
        name="action"
        value="google"
      >
        <Image
          src={GoogleIcon}
          width={40}
          height={40}
          alt="google"
          className={`h-full filter-[invert(${isDark ? 1 : 0})]`}
        />
      </button>

      <button
        className="hover:bg-accent m-1 ml-5 rounded-md p-1 transition-all duration-200"
        type="submit"
        name="action"
        value="github"
      >
        <Image
          src={GithubIcon}
          width={40}
          height={40}
          alt="github"
          className={`h-full filter-[invert(${isDark ? 1 : 0})]`}
        />
      </button>
    </form>
  );
};

export default SocialLogins;
