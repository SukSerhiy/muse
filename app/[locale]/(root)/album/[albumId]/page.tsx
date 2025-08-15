// app/album/[albumId]/page.tsx
import { notFound } from 'next/navigation';

interface AlbumPageProps {
  params: { albumId: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = params;
  // const album = await getAlbumById(albumId);
  const album = null;

  if (!album) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Album: {albumId}</h1>
    </div>
  );
}