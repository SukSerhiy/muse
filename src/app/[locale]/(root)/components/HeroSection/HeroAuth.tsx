'use client';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Person } from '@/components/layout/header';

const HeroAuth = () => {
  const { status } = useSession();
  const t = useTranslations();

  return (
    <>
      {status === 'authenticated' && <Person />}
      {status === 'unauthenticated' && (
        <div className="group font- cursor-pointer">
          <Link href="/sign-in">{t('Shared.Header.login')}</Link>
          <div className="border-foreground mx-2 hidden border-b-2 group-hover:block"></div>
        </div>
      )}
    </>
  );
};

export default HeroAuth;
