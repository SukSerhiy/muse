'use client';
import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
