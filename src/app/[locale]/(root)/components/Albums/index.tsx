'use client';
import { useTheme } from 'next-themes';
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
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <>
      {albums?.map((item) => (
        <Link href={`/album/${item.id}`} key={item.id} className="group">
          <Card className="group-hover:bg-accent w-full shadow-md transition-colors duration-300">
            <CardHeader className="flex gap-3">
              <Image
                src={coverPlug}
                width={25}
                height={25}
                alt="sign"
                className={`${isDark ? 'filter-(--filter-invert-full)' : ''} opacity-50`}
              />
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
                className={`shadow-lx mx-auto rounded-xs transition-transform duration-300 group-hover:scale-[1.03] ${item.cover_big ? '' : 'filter-(--filter-plug)'}`}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Albums;
