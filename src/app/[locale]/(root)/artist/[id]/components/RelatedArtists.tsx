'use client';
import { FC } from 'react';

import FetchList, { FetchFnParams } from '@/components/shared/FetchList';
import { ArtistsList } from '@/components/shared/ItemsList';
import { IArtist } from '@/lib/external/types';

type Props = {
  id: string | number;
};

const RelatedArtists: FC<Props> = ({ id }) => {
  const fetchAlbums = async ({ index }: FetchFnParams) => {
    const params = new URLSearchParams();
    params.append('id', String(id));
    params.append('index', String(index));
    params.append('limit', '10');
    const res = await fetch(`/api/artist/related?${params}`);
    return res.json();
  };

  return (
    <FetchList<IArtist>
      fetchFn={fetchAlbums}
      renderResults={(data) => (
        <div className="items-grid">
          <ArtistsList artists={data} />
        </div>
      )}
    />
  );
};

export default RelatedArtists;
