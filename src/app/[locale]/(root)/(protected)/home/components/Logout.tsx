import { doLogout } from '@/app/actions/auth.actions';

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className="my-2 rounded bg-blue-400 p-1 text-white" type="submit">
        Logout
      </button>
    </form>
  );
};

export default Logout;
