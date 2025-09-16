import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import Logout from './components/Logout';

const Home = async () => {
  const session = await auth();

  if (!session?.user) redirect('/');

  return (
    <div className="m-4 flex flex-col items-center">
      {session?.user?.name && session?.user?.image ? (
        <>
          <>
            <h1 className="my-2 text-3xl">Welcome, {session?.user?.name}</h1>
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={72}
              height={72}
              className="rounded-full"
            />
          </>
        </>
      ) : (
        <h1 className="my-2 text-3xl">Welcome, {session?.user?.email}</h1>
      )}
      <Logout />
    </div>
  );
};

export default Home;
