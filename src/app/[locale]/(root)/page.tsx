import { getTranslations } from 'next-intl/server';

import ObserverWrapper from '@/components/services/ObserverWrapper';
import {
  SearchAlbums,
  SearchArtist,
  SearchTracks,
} from '@/components/shared/FetchList';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCharts } from '@/lib/external/services';
import { mapTracksWithLikes } from '@/lib/features/tracks/utils/mappers';

import HeroSection, { HeroObserver } from './components/HeroSection';

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
        <section id="albums" className="my-3 px-4">
          <h1>{t('MainPage.Albums.title')}</h1>
          <SearchAlbums defaultData={albums} />
        </section>
      </ObserverWrapper>
      <ObserverWrapper animate>
        <section id="tracks" className="my-3 px-4">
          <h1>{t('MainPage.Tracks.title')}</h1>
          <SearchTracks defaultData={tracks} />
        </section>
      </ObserverWrapper>
      <ObserverWrapper animate>
        <section id="artists" className="my-3 px-4">
          <h1>{t('MainPage.Artists.title')}</h1>
          <SearchArtist defaultData={artists} />
        </section>
      </ObserverWrapper>
    </>
  );
}
