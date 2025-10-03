import Link from 'next/link';

import LoginForm from '@/components/shared/Login/LoginForm';

const LoginPage = () => {
  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <h1 className="my-3 text-3xl">Hey, time to Sign In</h1>
      <LoginForm />
      <p className="my-3">
        Don&apos;t you have an account?
        <Link href="register" className="mx-2 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
