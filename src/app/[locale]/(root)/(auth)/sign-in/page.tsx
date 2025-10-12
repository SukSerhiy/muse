import { getTranslations } from 'next-intl/server';

import LoginForm from '@/components/shared/Login/LoginForm';

export default async function SignInPage() {
  const t = await getTranslations();

  return (
    <div className="mx-auto mt-4 w-xl">
      <h1 className="mb-2 text-center text-2xl font-semibold">
        {t('SignIn.title')}
      </h1>
      <LoginForm />
    </div>
  );
}
