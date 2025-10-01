import Image from 'next/image';
import { notFound } from 'next/navigation';

import TrackQueue from '@/components/shared/TrackQueue';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getArtist, getArtistTracks } from '@/lib/external/services';
import { mapTracksWithLikes } from '@/lib/features/tracks/utils/mappers';

import AlbumsList from './components/Albums';
import RelatedArtists from './components/RelatedArtists';

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
    <div className="mb-5">
      <section id="main" className="my-3 px-4">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <Image
          src={pictureBig || avatarPlug}
          alt="artist"
          width={500}
          height={500}
          className="rounded-xs shadow-lg"
        />
      </section>
      <section id="tracks" className="my-3 px-4">
        <h2>Tracks</h2>
        <TrackQueue tracks={tracks} />
      </section>
      <section id="albums" className="my-3 px-4">
        <div className="flex justify-between">
          <h2>Albums</h2>
        </div>
        <AlbumsList id={id} />
      </section>
      <section id="artists" className="my-3 px-4">
        <div className="flex justify-between">
          <h2>Artists</h2>
        </div>
        <RelatedArtists id={id} />
      </section>
    </div>
  );
}
