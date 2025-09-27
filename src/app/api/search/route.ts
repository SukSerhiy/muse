import { NextResponse } from 'next/server';

import { searchAlbums } from '@/lib/external/services';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  if (!q) {
    return;
  }

  try {
    const result = await searchAlbums(q);

    return NextResponse.json(result);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
