import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { IArtistsList } from './types';

const Artists: FC<IArtistsList> = async ({ artists }) => {
  return (
    <>
      {artists?.map((item) => (
        <Link href={`/album/${item.id}`} key={item.id}>
          <Card className="w-full">
            <CardHeader>
              <div>
                <CardTitle>{item.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={item.picture_medium || ''}
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

export default Artists;
