import { getTranslations } from 'next-intl/server';

import ObserverWrapper from '@/components/services/ObserverWrapper';
import TrackQueue from '@/components/shared/TrackQueue';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCharts } from '@/lib/external/services';
import { mapTracksWithLikes } from '@/lib/features/tracks/utils/mappers';

import Artists from './components/Artists';
import HeroObserver from './components/HeroObserver';
import HeroSection from './components/HeroSection';
import SearchAlbums from './components/SearchAlbums';

export default async function Page() {
  const t = await getTranslations();
  const charts = await getCharts();
  const session = await auth();
  const { id: userId } = session?.user || {};

  const {
    albums: { data: albums },
    artists: { data: artists },
  } = charts;

  let {
    tracks: { data: tracks },
  } = charts;

  if (userId) {
    const likes = await db.like.findMany();
    tracks = mapTracksWithLikes(tracks, likes);
  }

  return (
    <>
      <HeroObserver>
        <HeroSection />
      </HeroObserver>
      <ObserverWrapper animate>
        <section id="albums" className="p-4">
          <h1 className="text-3xl font-bold">{t('MainPage.Albums.title')}</h1>
          <SearchAlbums defaultData={albums} />
        </section>
      </ObserverWrapper>
      <ObserverWrapper animate>
        <section id="tracks" className="mx-auto my-3 max-w-4xl">
          <TrackQueue tracks={tracks} />
        </section>
      </ObserverWrapper>
      <ObserverWrapper animate>
        <section
          id="artists"
          className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
        >
          <Artists artists={artists} />
        </section>
      </ObserverWrapper>
    </>
  );
}
