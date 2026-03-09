import Link from "next/link";
import { searchBusinesses } from "../../lib/data";
import SearchBar from "../../components/SearchBar";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolved = await searchParams;
  const q = typeof resolved.q === "string" ? resolved.q : "";
  if (q) return { title: `Search: ${q}` };
  return { title: "Search" };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolved = await searchParams;
  const q = typeof resolved.q === "string" ? resolved.q : "";
  const businesses = q.trim() ? await searchBusinesses(q.trim()) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Search</h1>
      <div className="mt-4">
        <SearchBar placeholder="Search businesses or categories..." />
      </div>
      {q != null && q.trim() !== "" && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Results for &quot;{q}&quot;
          </h2>
          {businesses.length === 0 ? (
            <p className="mt-3 text-zinc-500">No businesses found.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {businesses.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/b/${b.slug}`}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 hover:border-blue-200"
                  >
                    <div>
                      <span className="font-medium text-zinc-900">{b.name}</span>
                      {b.city && (
                        <span className="ml-2 text-sm text-zinc-500">
                          {b.city.name}
                          {b.category ? ` · ${b.category.name}` : ""}
                        </span>
                      )}
                    </div>
                    {b.is_featured && (
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        Featured
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
