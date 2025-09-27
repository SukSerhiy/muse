'use client';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { FC, useMemo, useState, useTransition } from 'react';

import Loader from '@/components/shared/Loader';
import { Input } from '@/components/ui/input';
import { IChartAlbum } from '@/lib/external/types/charts';

import Albums from '../Albums';
import { SearchAlbumsProps } from './types';

async function fetchSearchResults(query: string) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

const SearchAlbums: FC<SearchAlbumsProps> = ({ defaultData }) => {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<IChartAlbum[]>(defaultData);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (q: string) => {
        const results = await fetchSearchResults(q);
        startTransition(() => {
          setData(results.data);
        });
      }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setQuery(value);
    debouncedFetch(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-1/2 self-center">
        <Search className="text-muted-foreground absolute mx-2 mt-1.5 h-6 w-6" />
        <Input
          value={query}
          onChange={handleChange}
          type="search"
          className="py-4 pl-12 !text-lg"
          placeholder="Search..."
        />
      </div>
      {isPending ? (
        <Loader fullSize />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          <Albums albums={data} />
        </div>
      )}
    </div>
  );
};

export default SearchAlbums;
