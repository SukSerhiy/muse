import Image from 'next/image';

import { doSocialLogin } from '@/app/actions/auth.actions';
const GoogleIcon = '/icons/google.svg';
const GithubIcon = '/icons/github.svg';

const SocialLogins = () => {
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
          style={{ height: '100%' }}
        />
      </button>

      <button
        className="hover:bg-accent m-1 rounded-md p-1 transition-all duration-200"
        type="submit"
        name="action"
        value="github"
      >
        <Image
          src={GithubIcon}
          width={40}
          height={40}
          alt="github"
          style={{ height: '100%' }}
        />
      </button>
    </form>
  );
};

export default SocialLogins;
