import { NextResponse } from 'next/server';

import { searchTracks } from '@/lib/external/services';
import { getSearchParams } from '@/lib/utils/routeHandlers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { q, index, limit } = getSearchParams(searchParams, [
    'q',
    'index',
    'limit',
  ]);

  const indexNum = index ? Number(index) : 0;
  const limitNum = limit ? Number(limit) : 10;

  if (!q) {
    return NextResponse.json({});
  }

  try {
    const result = await searchTracks(q, { index: indexNum, limit: limitNum });

    return NextResponse.json(result);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
