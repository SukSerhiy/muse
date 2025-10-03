import Header from '@/components/layout/header';
import DynamicMargin from '@/components/shared/DynamicMargin';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        <DynamicMargin />
        {children}
      </main>
    </>
  );
}
