import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href="/products" className="text-4xl text-primary">
        На главную
      </Link>
    </div>
  );
}
