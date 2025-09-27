'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { IAlbumsList } from './types';

const coverPlug = '/images/vinyl.png';

const Albums: FC<IAlbumsList> = ({ albums }) => {
  return (
    <>
      {albums?.map((item) => (
        <Link href={`/album/${item.id}`} key={item.id}>
          <Card className="w-full">
            <CardHeader>
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.artist?.name}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={item.cover_medium || coverPlug}
                width={250}
                height={250}
                alt="album"
                className={item.cover_medium ? '' : 'filter-(--filter-plug)'}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Albums;
