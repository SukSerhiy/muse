import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import SessionProvider from "@/components/context/SessionProvider";
import { PlayerProvider } from "@/components/context/PlayerProvider";
import Player from "@/components/shared/Player";
import { getMessages, getLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Muse",
    default: APP_NAME,
  },
  description: "A modern deezer-based project for music searching",
  metadataBase: new URL(SERVER_URL),
};

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
              <PlayerProvider>
                {children}
                <Player />
              </PlayerProvider>
            </SessionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
