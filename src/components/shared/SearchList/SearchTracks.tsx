import SearchList from '@/components/shared/SearchList';
import TrackQueue from '@/components/shared/TrackQueue';
import { Track } from '@/lib/types';

const fetchTracks = async (query: string, index: number) => {
  const res = await fetch(
    `/api/search/tracks?q=${encodeURIComponent(query)}&index=${index}&limit=10`
  );
  return res.json();
};

export default function SearchTracks({
  defaultData,
}: {
  defaultData: Track[];
}) {
  return (
    <SearchList<Track>
      defaultData={defaultData}
      fetchFn={fetchTracks}
      renderResults={(data) => (
        <div className="relative w-full self-center md:w-1/2">
          <TrackQueue tracks={data} />
        </div>
      )}
    />
  );
}
