import { getTranslations } from 'next-intl/server';

import TrackQueue from '@/components/shared/TrackQueue';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getCharts } from '@/lib/external/services';
import { mapTracksWithLikes } from '@/lib/features/tracks/utils/mappers';

import Albums from './components/Albums';

export default async function Page() {
  const charts = await getCharts();
  const session = await auth();
  const { id: userId } = session?.user || {};

  const {
    albums: { data: albums },
  } = charts;

  let {
    tracks: { data: tracks },
  } = charts;

  if (userId) {
    const likes = await db.like.findMany();
    tracks = mapTracksWithLikes(tracks, likes);
  }

  const t = await getTranslations();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('ChartsPage.title')}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <Albums albums={albums} />
      </div>
      <div className="mx-auto my-3 max-w-4xl">
        <TrackQueue tracks={tracks} />
      </div>
    </div>
  );
}
