import { getTranslations } from 'next-intl/server';
import { getCharts } from '@/api';
import Albums from '@/components/pages/home/Albums';
import TrackQueue from '@/components/shared/tracks/TrackQueue';

export default async function Page() {
  const chartsData = await getCharts();
  const { data: albums } = chartsData.albums;

  const { data: tracks } = chartsData.tracks;

  const t = await getTranslations();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('ChartsPage.title')}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <Albums albums={albums} />
      </div>
      <div className="max-w-4xl mx-auto my-3">
        <TrackQueue tracks={tracks} />
      </div>
    </div>
  );
}
