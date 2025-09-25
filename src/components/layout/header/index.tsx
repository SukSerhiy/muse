'use client';

// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useHeaderVisibility } from '@/components/context/HeaderVisibilityProvider';
import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/lib/constants';

import ModeToggle from './ModeToggle';

const Header = () => {
  const { hidden } = useHeaderVisibility();

  const pathname = usePathname();

  const showNav = pathname === '/';

  return (
    <header
      className={`bg-background fixed z-50 w-full transition-[top] duration-300 ease-in-out ${hidden ? '-top-[80px]' : 'top-0'}`}
    >
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
          <div className="hidden space-x-[10vw] md:flex">
            {showNav && (
              <>
                <div className="group min-h-[2rem]">
                  <Link href="#tracks">Tracks</Link>
                  <div className="border-foreground mx-2 hidden border-b-2 group-hover:block"></div>
                </div>
                <div className="group">
                  <Link href="#albums">Albums</Link>
                  <div className="border-foreground mx-2 hidden border-b-2 group-hover:block"></div>
                </div>
                <div className="group">
                  <Link href="#artists">Artists</Link>
                  <div className="border-foreground mx-2 hidden border-b-2 group-hover:block"></div>
                </div>
              </>
            )}
          </div>
          <div className="min-w-12">
            <ModeToggle />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
