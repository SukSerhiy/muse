'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type HeaderVisibilityContextType = {
  hidden: boolean;
  setHiddenByHero: (hidden: boolean) => void;
};

const HeaderVisibilityContext =
  createContext<HeaderVisibilityContextType | null>(null);

export function HeaderVisibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  const [hiddenByHero, setHiddenByHero] = useState(isRoot);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  const lastScrollTop = useRef(0);
  const delta = 15;

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;

      if (Math.abs(lastScrollTop.current - st) <= delta) return;

      if (st > lastScrollTop.current && lastScrollTop.current > 0) {
        setHiddenByScroll(true);
      } else {
        setHiddenByScroll(false);
      }

      lastScrollTop.current = st;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isRoot && hiddenByHero) {
      setHiddenByHero(false);
    }
  }, [hiddenByHero, isRoot]);

  return (
    <HeaderVisibilityContext.Provider
      value={{
        hidden: hiddenByHero || hiddenByScroll,
        setHiddenByHero,
      }}
    >
      {children}
    </HeaderVisibilityContext.Provider>
  );
}

export function useHeaderVisibility() {
  const ctx = useContext(HeaderVisibilityContext);
  if (!ctx)
    throw new Error(
      'useHeaderVisibility must be used within HeaderVisibilityProvider'
    );
  return ctx;
}
