import ItemsGrid from '@/components/shared/ItemsGrid';
import { ArtistsList } from '@/components/shared/ItemsList';
import SearchList from '@/components/shared/SearchList';
import { IArtist } from '@/lib/external/types';

const fetchArtists = async (query: string, index: number) => {
  const res = await fetch(
    `/api/search/artists?q=${encodeURIComponent(query)}&index=${index}&limit=10`
  );
  return res.json();
};

export default function SearchArtists({
  defaultData,
}: {
  defaultData: IArtist[];
}) {
  return (
    <SearchList<IArtist>
      defaultData={defaultData}
      fetchFn={fetchArtists}
      renderResults={(data) => (
        <ItemsGrid>
          <ArtistsList artists={data} />
        </ItemsGrid>
      )}
    />
  );
}
