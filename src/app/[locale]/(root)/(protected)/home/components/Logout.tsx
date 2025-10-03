'use client';
import { signOut, useSession } from 'next-auth/react';

const Logout = () => {
  const { update } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      update();
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <form action={handleLogout}>
      <button className="my-2 rounded bg-blue-400 p-1 text-white" type="submit">
        Logout
      </button>
    </form>
  );
};

export default Logout;
