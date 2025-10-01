import FetchList from '@/components/shared/FetchList';
import { AlbumsList } from '@/components/shared/ItemsList';
import { IAlbum } from '@/lib/external/types';

import { FetchFnParams } from './';

const fetchAlbums = async ({ query, index }: FetchFnParams) => {
  const params = new URLSearchParams();
  params.append('index', String(index));
  params.append('limit', '10');
  if (query) {
    params.append('q', encodeURIComponent(query));
  }
  const res = await fetch(`/api/search/albums?${params}`);
  return res.json();
};

export default function SearchAlbums({
  defaultData,
}: {
  defaultData: IAlbum[];
}) {
  return (
    <FetchList<IAlbum>
      defaultData={defaultData}
      fetchFn={fetchAlbums}
      withSearch
      renderResults={(data) => (
        <div className="items-grid">
          <AlbumsList albums={data} />
        </div>
      )}
    />
  );
}
