import LoginForm from '@/components/shared/Login/LoginForm';

const LoginPage = () => {
  return (
    <div className="mx-auto mt-4 w-xl">
      <h1 className="mb-2 text-center text-2xl font-semibold">Sign In</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
