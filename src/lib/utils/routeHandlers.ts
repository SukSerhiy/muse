export const getSearchParams = (searchParams: URLSearchParams) => {
  const q = searchParams.get('q') || '';
  const index = Number(searchParams.get('index')) || 0;
  const limit = Number(searchParams.get('limit')) || 10;

  return { q, index, limit };
};
