import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

const Profile = async () => {
  const session = await auth();

  if (!session?.user) redirect('/');

  return <div>Profile</div>;
};

export default Profile;
