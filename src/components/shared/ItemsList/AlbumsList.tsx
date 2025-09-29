import { useTheme } from 'next-themes';
import Image from 'next/image';

import { IAlbum } from '@/lib/external/types';

import ItemsList from './';

const coverPlug = '/images/vinyl.png';

export default function Albums({ albums }: { albums: IAlbum[] }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ItemsList<IAlbum>
      items={albums}
      getHref={(a) => `/album/${a.id}`}
      getTitle={(a) => a.title}
      getDescription={(a) => a.artist?.name}
      getImage={(a) => a.cover_big}
      placeholder={coverPlug}
      icon={
        <Image
          src={coverPlug}
          width={25}
          height={25}
          alt="sign"
          className={`${isDark ? 'filter-(--filter-invert-full)' : ''} opacity-50`}
        />
      }
    />
  );
}
