import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug, getCategoryBySlug, getBusinessesByCityAndCategory } from "../../../../lib/data";
import DynamicBusinessMap from "../../../../components/DynamicBusinessMap";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}) {
  const { citySlug, categorySlug } = await params;
  const [city, category] = await Promise.all([
    getCityBySlug(citySlug),
    getCategoryBySlug(categorySlug),
  ]);
  if (!city || !category) return { title: "Category" };
  return {
    title: `${category.name} in ${city.name}`,
    description: `Find ${category.name} in ${city.name}. View on map and contact businesses.`,
  };
}

export default async function CityCategoryPage({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}) {
  const { citySlug, categorySlug } = await params;
  const [city, category] = await Promise.all([
    getCityBySlug(citySlug),
    getCategoryBySlug(categorySlug),
  ]);
  if (!city || !category) notFound();
  const businesses = await getBusinessesByCityAndCategory(city.id, category.id);
  const featured = businesses.filter((b) => b.is_featured);
  const rest = businesses.filter((b) => !b.is_featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-700">Home</Link>
        <span className="mx-1">/</span>
        <Link href={`/city/${city.slug}`} className="hover:text-zinc-700">{city.name}</Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-900">{category.name}</span>
      </nav>
      <h1 className="mt-2 text-2xl font-bold text-zinc-900">{category.name} in {city.name}</h1>

      <div className="mt-6 h-80 w-full overflow-hidden rounded-xl border border-zinc-200">
        <DynamicBusinessMap
          businesses={businesses}
          center={city.lat && city.lng ? [city.lat, city.lng] : undefined}
          zoom={12}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900">Listings</h2>
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
        {businesses.length === 0 && (
          <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-zinc-500">
            No businesses listed yet in this category. List your business to get featured.
          </p>
        )}
      </section>

      <section className="mt-10 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
        <p className="font-medium text-zinc-900">List your {category.name} business in {city.name}</p>
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
