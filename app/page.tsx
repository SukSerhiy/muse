import Link from 'next/link';

export default async function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
