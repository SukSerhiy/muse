import DynamicMargin from '@/components/layout/DynamicMargin';
import Header from '@/components/layout/header';

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
