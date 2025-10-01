export const getSearchParams = (
  searchParams: URLSearchParams,
  fields: string[]
) => {
  return fields.reduce<Record<string, string | null>>((acc, field) => {
    acc[field] = searchParams.get(field);
    return acc;
  }, {});
};
