'use client';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ComponentType, useState } from 'react';

import Dialog from '@/components/shared/Dialog';
import LoginForm from '@/components/shared/Login/LoginForm';

export default function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AuthWrapper(props: P) {
    const { status } = useSession();
    const [open, setOpen] = useState(false);
    const t = useTranslations('Shared.LoginDialog');

    if (status === 'loading') {
      return null;
    }

    if (status === 'unauthenticated') {
      return (
        <Dialog
          trigger={<Component {...props} />}
          open={open}
          setOpen={setOpen}
          title={t('title')}
          description={t('description')}
          content={<LoginForm />}
        />
      );
    }

    return <Component {...props} />;
  };
}
