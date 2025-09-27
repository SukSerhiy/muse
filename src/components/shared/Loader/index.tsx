import Image from 'next/image';
import { FC } from 'react';

import { cn } from '@/lib/utils';

import { LoaderProps } from './types';

const loader = '/images/loader.svg';

const Loader: FC<LoaderProps> = ({ className = '', fullSize }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullSize ? 'min-h-dvh w-full' : '',
        className
      )}
    >
      <Image src={loader} width={150} height={150} alt="Loading..." />
    </div>
  );
};

export default Loader;
