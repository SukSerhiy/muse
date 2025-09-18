import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import TrackQueue from '@/components/shared/TrackQueue';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { ApiError } from '@/lib/external/api/types';
import { getAlbum } from '@/lib/external/services';
import { mapTracksWithLikes } from '@/lib/features/tracks/utils/mappers';

const coverPlug = '/images/vinyl.png';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AlbumPage({ params }: PageProps) {
  try {
    const { id } = await params;
    const album = await getAlbum(Number(id));
    if (!album) {
      notFound();
    }
    const session = await auth();
    const { id: userId } = session?.user || {};

    const {
      title,
      release_date: releaseDate,
      cover_big: coverBig,
      artist: { id: artistId, name: artistName },
    } = album;

    let {
      tracks: { data: tracks },
    } = album;

    if (userId) {
      const likes = await db.like.findMany();
      tracks = mapTracksWithLikes(tracks, likes);
    }

    return (
      <div>
        <div className="flex gap-3">
          <Image
            src={coverBig || coverPlug}
            alt="album"
            width={500}
            height={500}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <Link href={`/artist/${artistId}`}>{artistName}</Link>
            <span>{releaseDate}</span>
          </div>
        </div>
        <TrackQueue tracks={tracks} />
      </div>
    );
  } catch (err: unknown) {
    const { message } = err as ApiError;
    if (message === 'no data') {
      notFound();
    } else {
      throw err;
    }
  }
}
