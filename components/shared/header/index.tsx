'use client'
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import ModeToggle from './mode-toggle';

const Header = () => {
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
          <ModeToggle />
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
