import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IAlbumsList } from './types';

const Albums: FC<IAlbumsList> = async ({ albums }) => {
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
                src={item.cover_medium || ''}
                width={250}
                height={250}
                alt="album"
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Albums;
