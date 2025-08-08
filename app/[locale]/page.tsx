/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCharts } from '@/api';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function Page() {
  const chartsData = await getCharts();
  const { data: albums } = chartsData.albums;
  console.log('albums', albums);

  const t = await getTranslations();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('ChartsPage.title')}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {albums?.map((item) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.artist?.name}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <img src={item.cover_medium || ''} alt="album" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
