import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { IArtistsList } from './types';

const Artists: FC<IArtistsList> = async ({ artists }) => {
  return (
    <>
      {artists?.map((item) => (
        <Link href={`/artist/${item.id}`} key={item.id} className="group">
          <Card className="group-hover:bg-accent w-full shadow-md transition-colors duration-300">
            <CardHeader>
              <div>
                <CardTitle>{item.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Image
                src={item.picture_medium || ''}
                width={300}
                height={300}
                alt="artist"
                className={`shadow-lx mx-auto rounded-xs transition-transform duration-300 group-hover:scale-[1.03] ${item.picture_big ? '' : 'filter-(--filter-plug)'}`}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Artists;
