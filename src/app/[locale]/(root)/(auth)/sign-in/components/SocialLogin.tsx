import { doSocialLogin } from '@/app/actions/auth.actions';

const SocialLogins = () => {
  return (
    <form action={doSocialLogin}>
      <button
        className="m-1 rounded-md bg-pink-400 p-1 text-lg text-white"
        type="submit"
        name="action"
        value="google"
      >
        Sign In With Google
      </button>

      <button
        className="m-1 rounded-md bg-black p-1 text-lg text-white"
        type="submit"
        name="action"
        value="github"
      >
        Sign In With GitHub
      </button>
    </form>
  );
};

export default SocialLogins;
