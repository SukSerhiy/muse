// TODO: Убрать хардкод с userId
'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { Track } from '@/lib/types/track';

// Temporary, needs to be removed
export async function refresh() {
  revalidatePath('/', 'layout');
}

export async function likeTrack(track: Track, isDislike?: boolean) {
  const session = await auth();
  const { id: userId } = session?.user || {};

  if (!userId) {
    throw new Error('User not found');
  }

  let existingTrack = await db.track.findUnique({
    where: {
      id: track.id,
    },
  });

  if (!existingTrack) {
    delete track.like;
    existingTrack = await db.track.create({
      data: track,
    });
  }

  const existingLike = await db.like.findUnique({
    where: {
      userId_trackId: { userId, trackId: track.id },
    },
  });

  if (!existingLike) {
    await db.like.create({
      data: { trackId: track.id, userId, isDislike },
    });
  } else if (existingLike.isDislike === isDislike) {
    await db.like.delete({
      where: { userId_trackId: { userId, trackId: track.id } },
    });
  } else {
    await db.like.update({
      where: { userId_trackId: { userId, trackId: track.id } },
      data: { isDislike },
    });
  }

  revalidatePath('/', 'layout');
}
