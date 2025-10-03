import type { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import '@/assets/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import { HeaderVisibilityProvider } from '@/components/context/HeaderVisibilityProvider';
import { PlayerProvider } from '@/components/context/PlayerProvider';
import SessionProvider from '@/components/context/SessionProvider';
import Player from '@/components/shared/Player';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { APP_NAME, SERVER_URL } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Muse',
    default: APP_NAME,
  },
  description: 'A modern deezer-based project for music searching',
  metadataBase: new URL(SERVER_URL),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SessionProvider>
              <HeaderVisibilityProvider>
                <PlayerProvider>
                  {children}
                  <Player />
                </PlayerProvider>
              </HeaderVisibilityProvider>
              <Toaster position="top-center" />
            </SessionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
