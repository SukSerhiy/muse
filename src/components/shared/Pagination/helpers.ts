export function getPageNumbers(
  current: number,
  total: number,
  delta = 2
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const range: (number | 'ellipsis')[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    range.unshift('ellipsis');
  }
  if (current + delta < total - 1) {
    range.push('ellipsis');
  }

  range.unshift(1);
  if (total > 1) {
    range.push(total);
  }

  let prev: number | 'ellipsis' | null = null;
  for (const p of range) {
    if (p !== prev) {
      pages.push(p);
      prev = p;
    }
  }

  return pages;
}
