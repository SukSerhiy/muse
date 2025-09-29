'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList';

type BaseItem = { id: number };

type ItemsListProps<T extends BaseItem> = {
  items: T[];
  getHref: (item: T) => string;
  getTitle: (item: T) => ReactNode;
  getDescription?: (item: T) => ReactNode;
  getImage: (item: T) => string | null | undefined;
  icon?: ReactNode;
  placeholder: string;
};

const ItemsList = <T extends BaseItem>({
  items,
  getHref,
  getTitle,
  getDescription,
  getImage,
  icon,
  placeholder,
}: ItemsListProps<T>) => {
  return (
    <>
      {items.map((item) => {
        const img = getImage(item) || placeholder;
        return (
          <Link href={getHref(item)} key={item.id} className="group">
            <Card className="group-hover:bg-accent w-full shadow-md transition-colors duration-300">
              <CardHeader className="flex gap-3">
                {icon}
                <div>
                  <CardTitle>{getTitle(item)}</CardTitle>
                  {getDescription && (
                    <CardDescription>{getDescription(item)}</CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src={img}
                  width={300}
                  height={300}
                  alt="cover"
                  className={`shadow-lx mx-auto rounded-xs transition-transform duration-300 group-hover:scale-[1.03] ${img !== placeholder ? '' : 'filter-(--filter-plug)'}`}
                />
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export default ItemsList;

export { AlbumsList, ArtistsList };
