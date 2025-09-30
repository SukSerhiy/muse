import { NextResponse } from 'next/server';

import { searchTracks } from '@/lib/external/services';
import { getSearchParams } from '@/lib/utils/routeHandlers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { q, index, limit } = getSearchParams(searchParams);

  if (!q) {
    return NextResponse.json({});
  }

  try {
    const result = await searchTracks(q, { index, limit });

    return NextResponse.json(result);
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
