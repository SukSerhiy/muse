import Image from 'next/image';
import { notFound } from 'next/navigation';

import TrackQueue from '@/components/shared/TrackQueue';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getArtist, getArtistTracks } from '@/lib/external/services';
import { mapTracksWithLikes } from '@/lib/features/tracks/utils/mappers';

const avatarPlug = '/images/person.jpg';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArtistPage({ params }: PageProps) {
  const { id } = await params;
  const artist = await getArtist(Number(id));
  if (!artist) {
    notFound();
  }

  let { data: tracks } = await getArtistTracks(Number(id));

  const session = await auth();
  const { id: userId } = session?.user || {};

  if (userId) {
    const likes = await db.like.findMany();
    tracks = mapTracksWithLikes(tracks, likes);
  }

  const { name, picture_big: pictureBig } = artist;

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <Image
        src={pictureBig || avatarPlug}
        alt="artist"
        width={500}
        height={500}
        className="rounded-xs shadow-lg"
      />
      <TrackQueue tracks={tracks} />
    </div>
  );
}
