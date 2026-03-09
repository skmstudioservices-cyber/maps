import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-semibold text-zinc-900">
          India Directory
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/list-your-business" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            List your business
          </Link>
        </nav>
      </div>
    </header>
  );
}
