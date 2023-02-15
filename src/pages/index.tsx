import Link from "next/link";

function HomePage() {
  return (
    <div>
      <div>Welcome to Next.js!</div>
      <Link href="/about">About</Link>
    </div>
  );
}

export default HomePage;
