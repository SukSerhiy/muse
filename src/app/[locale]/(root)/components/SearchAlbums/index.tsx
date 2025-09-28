'use client';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useMemo, useState } from 'react';

import Loader from '@/components/shared/Loader';
import Pagination from '@/components/shared/Pagination';
import { Input } from '@/components/ui/input';
import { IChartAlbum } from '@/lib/external/types/charts';

import Albums from '../Albums';
import { SearchAlbumsProps } from './types';

const LIMIT = 10;

async function fetchSearchResults(query: string, index: number = 0) {
  const res = await fetch(
    `/api/search?q=${encodeURIComponent(query)}&index=${index}&limit=${LIMIT}`
  );
  return res.json();
}

const SearchAlbums: FC<SearchAlbumsProps> = ({ defaultData }) => {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<IChartAlbum[]>(defaultData);
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
    setLoading(true); // показываем Loader сразу
    debouncedFetch(value, 0); // всегда с первой страницы при новом поиске
  };

  const handlePageChange = (page: number) => {
    const newIndex = (page - 1) * LIMIT;
    setLoading(true); // показываем Loader при смене страницы
    debouncedFetch(query, newIndex);
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
          placeholder={t('Shared.search_placeholder')}
        />
      </div>

      {loading ? (
        <Loader fullSize />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          <Albums albums={data} />
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

export default SearchAlbums;
