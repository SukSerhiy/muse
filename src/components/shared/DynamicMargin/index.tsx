'use client';
import { usePathname } from 'next/navigation';

const DynamicMargin = () => {
  const pathname = usePathname();

  const className = pathname === '/' ? '' : 'mt-[5rem]';

  return <div className={className} />;
};

export default DynamicMargin;
