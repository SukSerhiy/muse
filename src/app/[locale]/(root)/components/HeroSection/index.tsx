import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from '@/components/layout/header';
import { APP_NAME } from '@/lib/constants';

import HeroAuth from './HeroAuth';
import HeroObserver from './HeroObserver';
import HeroOverlay from './HeroOverlay';

const HeroSection = async () => {
  const t = await getTranslations();

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col bg-cover px-3 py-3"
    >
      <HeroOverlay />
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
            priority
            className="filter-(--filter-logo)"
          />
          <span className="text-2xl font-bold">Muse</span>
        </Link>
        <div className="hidden space-x-[10vw] md:flex">
          <div className="group">
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
        </div>
        <div className="flex items-center gap-3">
          <HeroAuth />
          <div className="min-w-12">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="text-hero-foreground flex flex-1 flex-col items-center justify-center">
        <h1 className="mb-24 text-center text-6xl font-bold">
          {t('MainPage.Hero.title')}
        </h1>
        <p className="w-full text-justify text-xl md:w-2/3 lg:w-1/3">
          {t('MainPage.Hero.description')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

export { HeroObserver };
