export default async function Home() {
  const rest = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await rest.json();
  console.log('data', data);
  return (
    <div>Hello world</div>
  );
}
