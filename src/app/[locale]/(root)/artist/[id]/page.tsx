import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Albums from '@/app/[locale]/(root)/components/Albums';
import TrackQueue from '@/components/shared/TrackQueue';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  getArtist,
  getArtistAlbums,
  getArtistTracks,
} from '@/lib/external/services';
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

  const { data: albums } = await getArtistAlbums(Number(id));

  const { name, picture_big: pictureBig } = artist;

  console.log('albums', albums);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <Image
        src={pictureBig || avatarPlug}
        alt="artist"
        width={500}
        height={500}
        className="rounded-xs shadow-lg"
      />
      <TrackQueue tracks={tracks} />
      <div className="flex justify-between">
        <h3>Albums</h3>
        <Link href="#">Show all</Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <Albums albums={albums} />
      </div>
    </div>
  );
}
