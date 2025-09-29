'use client';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import Loader from '@/components/shared/Loader';
import Pagination from '@/components/shared/Pagination';
import { Input } from '@/components/ui/input';

import SearchAlbums from './SearchAlbums';
import SearchTracks from './SearchTracks';

const LIMIT = 10;

type SearchListProps<T> = {
  defaultData: T[];
  fetchFn: (
    query: string,
    index: number
  ) => Promise<{ data: T[]; total: number }>;
  renderResults: (data: T[]) => ReactNode;
};

function SearchList<T>({
  defaultData,
  fetchFn,
  renderResults,
}: SearchListProps<T>) {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<T[]>(defaultData);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentPage = Math.floor(index / LIMIT) + 1;

  const debouncedFetch = useMemo(
    () =>
      debounce(async (q: string, idx: number) => {
        try {
          const results = await fetchFn(q, idx);
          setData(results.data);
          setTotal(results.total);
          setIndex(idx);
        } finally {
          setLoading(false);
        }
      }, 300),
    [fetchFn]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIndex(0);
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

      {loading ? <Loader fullSize /> : renderResults(data)}

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
}

export default SearchList;

export { SearchAlbums, SearchTracks };
