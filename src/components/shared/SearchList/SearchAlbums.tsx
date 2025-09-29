import ItemsGrid from '@/components/shared/ItemsGrid';
import { AlbumsList } from '@/components/shared/ItemsList';
import SearchList from '@/components/shared/SearchList';
import { IAlbum } from '@/lib/external/types';

const fetchAlbums = async (query: string, index: number) => {
  const res = await fetch(
    `/api/search/albums?q=${encodeURIComponent(query)}&index=${index}&limit=10`
  );
  return res.json();
};

export default function SearchAlbums({
  defaultData,
}: {
  defaultData: IAlbum[];
}) {
  return (
    <SearchList<IAlbum>
      defaultData={defaultData}
      fetchFn={fetchAlbums}
      renderResults={(data) => (
        <ItemsGrid>
          <AlbumsList albums={data} />
        </ItemsGrid>
      )}
    />
  );
}
