'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import SocialLogin from './SocialLogin';

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState('');

  const { update } = useSession();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (response.error) {
        console.error(response.error);
        setError(response.error);
      } else {
        update();
        router.push('/home');
      }
    } catch (e: unknown) {
      setError('Check your Credentials');
      console.error(e);
    }
  }

  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center rounded-md border border-gray-200 p-3"
        onSubmit={handleFormSubmit}
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="mx-2 rounded border border-gray-500"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="mx-2 rounded border border-gray-500"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex w-36 items-center justify-center rounded bg-orange-300"
        >
          Ceredential Login
        </button>
      </form>
      <SocialLogin />
    </>
  );
};

export default LoginForm;
