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
        <Link href={`/album/${item.id}`} key={item.id} className="group">
          <Card className="group-hover:bg-accent w-full transition-colors duration-300">
            <CardHeader>
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.artist?.name}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={item.cover_big || coverPlug}
                width={300}
                height={300}
                alt="album"
                className={`mx-auto transition-transform duration-300 group-hover:scale-[1.03] ${item.cover_big ? '' : 'filter-(--filter-plug)'}`}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Albums;
