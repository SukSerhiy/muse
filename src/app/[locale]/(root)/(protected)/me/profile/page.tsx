import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// import Avatar from './components/Avatar';
import UserForm from './components/UserForm';

const Profile = async () => {
  const session = await auth();

  const t = await getTranslations();

  if (!session?.user) redirect('/');

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="mx-auto mt-4 w-xl">
      <h1 className="mb-2 text-center text-2xl font-semibold">
        {t('EditProfile.title')}
      </h1>
      <UserForm user={user} />
    </div>
  );
};

export default Profile;
