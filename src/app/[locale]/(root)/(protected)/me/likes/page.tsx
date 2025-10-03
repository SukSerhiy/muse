import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

const Likes = async () => {
  const session = await auth();

  if (!session?.user) redirect('/');

  return <div>Likes</div>;
};

export default Likes;
