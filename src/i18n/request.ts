import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['en', 'ua'] as const;

type AppLocale = (typeof supportedLocales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const resolvedLocale: AppLocale = supportedLocales.includes(
    requested as AppLocale
  )
    ? (requested as AppLocale)
    : 'en';

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
  };
});
