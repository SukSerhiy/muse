'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  children: ReactNode[] | ReactNode;
  onChange?: (isView: boolean) => void;
  animate?: boolean;
  threshold?: number;
};

const ObserverWrapper: FC<Props> = ({
  children,
  onChange,
  animate,
  threshold = 0.3,
}) => {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
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
