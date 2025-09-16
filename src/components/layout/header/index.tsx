'use client';

// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/lib/constants';

import ModeToggle from './ModeToggle';

const Header = () => {
  // const { data: session, status } = useSession();

  return (
    <header>
      <div className="px-2 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex w-min items-center gap-3">
            <Image
              src="/images/logo.png"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
              priority
              className="filter-(--filter-logo)"
            />
            <span className="text-secondary-foreground text-2xl font-bold">
              Muse
            </span>
          </Link>
          {/* {status === 'loading' ? null : session?.user ? 'In' : 'Out'} */}
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
