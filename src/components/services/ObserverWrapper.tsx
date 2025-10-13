'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  children: ReactNode[] | ReactNode;
  onChange?: (isView: boolean) => void;
  animate?: boolean;
};

const ObserverWrapper: FC<Props> = ({ children, onChange, animate }) => {
  const [threshold, setThreshold] = useState(0.3);

  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    const updateThreshold = () => {
      setThreshold(window.innerWidth < 768 ? 0.1 : 0.3);
    };
    updateThreshold();
    window.addEventListener('resize', updateThreshold);
    return () => window.removeEventListener('resize', updateThreshold);
  }, []);

  useEffect(() => {
    console.log('inView:', inView);
    onChange?.(inView);
  }, [inView, onChange]);

  return (
    <div
      ref={ref}
      className={
        animate
          ? `transition-all duration-700 ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default ObserverWrapper;
