import FetchList from '@/components/shared/FetchList';
import { ArtistsList } from '@/components/shared/ItemsList';
import { IArtist } from '@/lib/external/types';

import { FetchFnParams } from './';

const fetchArtists = async ({ query, index }: FetchFnParams) => {
  const params = new URLSearchParams();
  params.append('index', String(index));
  params.append('limit', '10');
  if (query) {
    params.append('q', encodeURIComponent(query));
  }
  const res = await fetch(`/api/search/artists?${params}`);
  return res.json();
};

export default function SearchArtists({
  defaultData,
}: {
  defaultData: IArtist[];
}) {
  return (
    <FetchList<IArtist>
      defaultData={defaultData}
      fetchFn={fetchArtists}
      withSearch
      renderResults={(data) => (
        <div className="items-grid">
          <ArtistsList artists={data} />
        </div>
      )}
    />
  );
}
