type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArtistPage({ params }: PageProps) {
  const { id } = await params;

  return <div>Artist id = {id}</div>;
}
