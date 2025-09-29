import { IArtist } from '@/lib/external/types';

import ItemsList from './';

const personPlug = '/images/boy.png';

export default function Artists({ artists }: { artists: IArtist[] }) {
  return (
    <ItemsList<IArtist>
      items={artists}
      getHref={(a) => `/artist/${a.id}`}
      getTitle={(a) => a.name}
      getImage={(a) => a.picture_big}
      placeholder={personPlug}
    />
  );
}
