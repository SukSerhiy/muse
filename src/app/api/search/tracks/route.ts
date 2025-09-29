import { NextResponse } from 'next/server';

import { searchTracks } from '@/lib/external/services';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const index = Number(searchParams.get('index')) || 0;
  const limit = Number(searchParams.get('limit')) || 10;

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
