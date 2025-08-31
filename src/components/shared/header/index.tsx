'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import ModeToggle from './ModeToggle';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header>
      <div className="py-3 px-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 w-min">
            <Image
              src="/images/logo.png"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
              priority
              className="filter-(--filter-logo)"
            />
            <span className="text-2xl font-bold text-slate-600">Muse</span>
          </Link>
          {status === 'loading' ? null : session?.user ? 'In' : 'Out'}
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
