import { NextResponse } from 'next/server';

import { DEFAULT_LIMIT } from '@/lib/external/api/constants';
import { getArtistAlbums } from '@/lib/external/services';
import { getSearchParams } from '@/lib/utils/routeHandlers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { id, index, limit } = getSearchParams(searchParams, [
    'id',
    'index',
    'limit',
  ]);

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const indexNum = index ? Number(index) : 0;
  const limitNum = limit ? Number(limit) : DEFAULT_LIMIT;

  try {
    const result = await getArtistAlbums(+id, {
      index: indexNum,
      limit: limitNum,
    });

    return NextResponse.json(result);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
