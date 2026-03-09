import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCities } from "../../../lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { title: "Category" };
  return {
    title: `${category.name} – Cities`,
    description: `Find ${category.name} in cities across India.`,
  };
}

export default async function CategoryIndexPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const [category, cities] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getCities(),
  ]);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">{category.name}</h1>
      <p className="mt-1 text-zinc-600">Choose a city</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/city/${city.slug}/${category.slug}`}
            className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-blue-100 hover:text-blue-800"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
