'use client';
import { FC, ReactNode } from 'react';

import { useHeaderVisibility } from '@/components/context/HeaderVisibilityProvider';
import ObserverWrapper from '@/components/services/ObserverWrapper';

type Props = {
  children: ReactNode | ReactNode[];
};

const HeroObserver: FC<Props> = ({ children }) => {
  const { setHiddenByHero } = useHeaderVisibility();

  return (
    <ObserverWrapper onChange={setHiddenByHero}>{children}</ObserverWrapper>
  );
};

export default HeroObserver;
