import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug, getCategories, getBusinessesByCity } from "../../../lib/data";
import SearchBar from "../../../components/SearchBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return { title: "City" };
  return {
    title: `Businesses in ${city.name}`,
    description: `Find local businesses in ${city.name}. Search by category.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();
  const [categories, businesses] = await Promise.all([
    getCategories(),
    getBusinessesByCity(city.id),
  ]);
  const featured = businesses.filter((b) => b.is_featured);
  const rest = businesses.filter((b) => !b.is_featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">{city.name}</h1>
      <p className="mt-1 text-zinc-600">Find businesses in {city.name}</p>
      <div className="mt-4">
        <SearchBar placeholder={`Search in ${city.name}...`} />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">Categories</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/city/${city.slug}/${cat.slug}`}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-blue-200 hover:bg-blue-50/50"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {businesses.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-900">Businesses</h2>
          <ul className="mt-3 space-y-2">
            {featured.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/b/${b.slug}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 hover:border-blue-200"
                >
                  <span className="font-medium text-zinc-900">{b.name}</span>
                  {b.is_featured && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Featured
                    </span>
                  )}
                </Link>
              </li>
            ))}
            {rest.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/b/${b.slug}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 hover:border-blue-200"
                >
                  <span className="font-medium text-zinc-900">{b.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
        <p className="font-medium text-zinc-900">List your business in {city.name}</p>
        <Link
          href="/list-your-business"
          className="mt-2 inline-block text-sm font-medium text-blue-700 hover:underline"
        >
          Get featured →
        </Link>
      </section>
    </div>
  );
}
