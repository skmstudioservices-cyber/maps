import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-semibold text-zinc-900">
            India Directory
          </Link>
          <div className="flex gap-6">
            <Link href="/list-your-business" className="text-sm text-zinc-600 hover:text-zinc-900">
              List your business
            </Link>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Find local businesses across India. Get more customers with a featured listing.
        </p>
      </div>
    </footer>
  );
}
