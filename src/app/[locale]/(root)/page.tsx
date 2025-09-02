import { getTranslations } from 'next-intl/server';

import TrackQueue from '@/components/shared/TrackQueue';
import { db } from '@/lib/db';
import { getCharts } from '@/lib/external/services';
import { Like } from '@/lib/types/track';

import Albums from './components/Albums';

export default async function Page() {
  const chartsData = await getCharts();
  const { data: albums } = chartsData.albums;

  const { data: tracks } = chartsData.tracks;

  const likes = await db.like.findMany();

  const tracksWithLikes = tracks.map((item) => {
    const trackLike = likes.find((l) => l.trackId === item.id);
    let currentLike: Like | null = null;
    if (trackLike) {
      currentLike = trackLike.isDislike ? 'dislike' : 'like';
    }
    return {
      ...item,
      like: currentLike,
    };
  });

  const t = await getTranslations();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('ChartsPage.title')}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <Albums albums={albums} />
      </div>
      <div className="mx-auto my-3 max-w-4xl">
        <TrackQueue tracks={tracksWithLikes} />
      </div>
    </div>
  );
}
