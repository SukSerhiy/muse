import { redirect } from 'next/navigation';

// import { CalendarForm } from '@/components/shared/Datepicker';
import { auth } from '@/lib/auth';

// import Avatar from './components/Avatar';
import UserForm from './components/UserForm';

const Profile = async () => {
  const session = await auth();

  if (!session?.user) redirect('/');

  return (
    <div>
      {/* <Avatar /> */}
      <UserForm />
      {/* <CalendarForm /> */}
    </div>
  );
};

export default Profile;
