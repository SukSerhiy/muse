'use client';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import Loader from '@/components/shared/Loader';
import Pagination from '@/components/shared/Pagination';
import { Input } from '@/components/ui/input';

import SearchAlbums from './SearchAlbums';
import SearchArtist from './SearchArtists';
import SearchTracks from './SearchTracks';

const LIMIT = 10;

type FetchFnParams = {
  query?: string;
  index: number;
};

type FetchListProps<T> = {
  defaultData: T[];
  withSearch?: boolean;
  fetchFn: (params: FetchFnParams) => Promise<{ data: T[]; total: number }>;
  renderResults: (data: T[]) => ReactNode;
};

function FetchList<T>({
  defaultData,
  withSearch,
  fetchFn,
  renderResults,
}: FetchListProps<T>) {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<T[]>(defaultData);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  const currentPage = Math.floor(index / LIMIT) + 1;

  const debouncedFetch = useMemo(
    () =>
      debounce(async (params: FetchFnParams, requestId: number) => {
        try {
          const results = await fetchFn(params);
          if (requestId !== requestIdRef.current) {
            return;
          }

          setData(results.data);
          setTotal(results.total);
          setIndex(params.index);
        } finally {
          if (requestId === requestIdRef.current) {
            setLoading(false);
          }
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
    if (withSearch && !query) {
      requestIdRef.current++;

      setData(defaultData);
      setTotal(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    const currentRequestId = ++requestIdRef.current;
    const params: FetchFnParams = { index };
    if (withSearch) {
      params.query = query;
    }
    debouncedFetch(params, currentRequestId);
  }, [query, index, defaultData, debouncedFetch, withSearch]);

  useEffect(() => {
    if (!data) {
      setData(defaultData);
    }
  }, [data, defaultData]);

  return (
    <div className="flex flex-col gap-3">
      {withSearch && (
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
      )}

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

export default FetchList;

export { SearchAlbums, SearchTracks, SearchArtist };

export type { FetchFnParams };
