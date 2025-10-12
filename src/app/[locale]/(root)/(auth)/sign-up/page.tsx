import { getTranslations } from 'next-intl/server';

import SignUpForm from './components/SignUpForm';

export default async function SignUpPage() {
  const t = await getTranslations();

  return (
    <div className="mx-auto w-xl">
      <h1 className="mb-2 text-center text-2xl font-semibold">
        {t('SignUp.title')}
      </h1>
      <SignUpForm />
    </div>
  );
}
