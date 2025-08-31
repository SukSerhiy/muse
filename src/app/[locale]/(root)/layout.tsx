import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mt-3 px-1 md:px-3">
        {children}
      </main>
    </>
  );
}
