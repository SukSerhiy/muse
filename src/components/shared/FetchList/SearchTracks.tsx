import FetchList from '@/components/shared/FetchList';
import TrackQueue from '@/components/shared/TrackQueue';
import { Track } from '@/lib/types';

import { FetchFnParams } from './';

const fetchTracks = async ({ query, index }: FetchFnParams) => {
  const params = new URLSearchParams();
  params.append('index', String(index));
  params.append('limit', '10');
  if (query) {
    params.append('q', encodeURIComponent(query));
  }
  const res = await fetch(`/api/search/tracks?${params}`);
  return res.json();
};

export default function SearchTracks({
  defaultData,
}: {
  defaultData: Track[];
}) {
  return (
    <FetchList<Track>
      defaultData={defaultData}
      fetchFn={fetchTracks}
      withSearch
      renderResults={(data) => (
        <div className="relative w-full self-center md:w-1/2">
          <TrackQueue tracks={data} />
        </div>
      )}
    />
  );
}
