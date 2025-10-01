'use client';
import { FC } from 'react';

import FetchList, { FetchFnParams } from '@/components/shared/FetchList';
import { AlbumsList } from '@/components/shared/ItemsList';
import { IAlbum } from '@/lib/external/types';

type Props = {
  id: string | number;
};

const ArtistAlbums: FC<Props> = ({ id }) => {
  const fetchAlbums = async ({ index }: FetchFnParams) => {
    const params = new URLSearchParams();
    params.append('id', String(id));
    params.append('index', String(index));
    params.append('limit', '10');
    const res = await fetch(`/api/artist/albums?${params}`);
    return res.json();
  };

  return (
    <FetchList<IAlbum>
      fetchFn={fetchAlbums}
      renderResults={(data) => (
        <div className="items-grid">
          <AlbumsList albums={data} />
        </div>
      )}
    />
  );
};

export default ArtistAlbums;
