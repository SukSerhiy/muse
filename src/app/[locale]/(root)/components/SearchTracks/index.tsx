'use client';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useMemo, useState } from 'react';

import Loader from '@/components/shared/Loader';
import Pagination from '@/components/shared/Pagination';
import TrackQueue from '@/components/shared/TrackQueue';
import { Input } from '@/components/ui/input';
import { Track } from '@/lib/types';

import { SearchTracksProps } from './types';

const LIMIT = 10;

async function fetchSearchResults(query: string, index: number = 0) {
  const res = await fetch(
    `/api/search/tracks?q=${encodeURIComponent(query)}&index=${index}&limit=${LIMIT}`
  );
  return res.json();
}

const SearchTracks: FC<SearchTracksProps> = ({ defaultData }) => {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Track[]>(defaultData);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentPage = Math.floor(index / LIMIT) + 1;

  const debouncedFetch = useMemo(
    () =>
      debounce(async (q: string, idx: number) => {
        try {
          const results = await fetchSearchResults(q, idx);
          setData(results.data);
          setTotal(results.total);
          setIndex(idx);
        } finally {
          setLoading(false);
        }
      }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setLoading(true);
  };

  const handlePageChange = (page: number) => {
    setIndex((page - 1) * LIMIT);
  };

  useEffect(() => {
    if (!query) {
      setData(defaultData);
      setTotal(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    debouncedFetch(query, index);
  }, [query, index, defaultData, debouncedFetch]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full self-center md:w-1/2">
        <Search className="text-muted-foreground absolute mx-2 mt-1.5 h-6 w-6" />
        <Input
          value={query}
          onChange={handleChange}
          type="search"
          className="py-4 pl-12 !text-lg"
          placeholder={t('Shared.search_placeholder')}
        />
      </div>

      {loading ? (
        <Loader fullSize />
      ) : (
        <div className="relative w-full self-center md:w-1/2">
          <TrackQueue tracks={data} />
        </div>
      )}

      <div className="self-center">
        <Pagination
          currentPage={currentPage}
          totalItems={total}
          pageSize={LIMIT}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchTracks;
