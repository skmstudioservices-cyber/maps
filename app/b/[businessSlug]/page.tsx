import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "../../../lib/data";
import type { Business } from "../../../types/database";

function JsonLd({ business }: { business: Business }) {
  const city = business.city;
  const category = business.category;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description ?? undefined,
    address: business.address
      ? {
          "@type": "PostalAddress",
          streetAddress: business.address,
        }
      : undefined,
    geo:
      business.lat != null && business.lng != null
        ? {
            "@type": "GeoCoordinates",
            latitude: business.lat,
            longitude: business.lng,
          }
        : undefined,
    telephone: business.phone ?? undefined,
    email: business.email ?? undefined,
    url: business.website ?? undefined,
    ...(city && { areaServed: { "@type": "City", name: city.name } }),
    ...(category && { image: undefined }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug);
  if (!business) return { title: "Business" };
  const city = business.city?.name ?? "";
  return {
    title: `${business.name}${city ? ` – ${city}` : ""}`,
    description:
      business.description?.slice(0, 160) ??
      `${business.name}${city ? ` in ${city}` : ""}. Contact, address, directions.`,
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug);
  if (!business) notFound();

  const city = business.city;
  const category = business.category;

  return (
    <>
      <JsonLd business={business} />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-700">Home</Link>
          {city && (
            <>
              <span className="mx-1">/</span>
              <Link href={`/city/${city.slug}`} className="hover:text-zinc-700">{city.name}</Link>
            </>
          )}
          {category && (
            <>
              <span className="mx-1">/</span>
              <Link
                href={`/city/${city?.slug}/${category.slug}`}
                className="hover:text-zinc-700"
              >
                {category.name}
              </Link>
            </>
          )}
          <span className="mx-1">/</span>
          <span className="text-zinc-900">{business.name}</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-zinc-900">{business.name}</h1>
          {business.is_featured && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              Featured
            </span>
          )}
          {business.is_verified && (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Verified
            </span>
          )}
        </div>

        {business.description && (
          <p className="mt-3 text-zinc-600">{business.description}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {business.phone && (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Call
            </a>
          )}
          {business.whatsapp && (
            <a
              href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              WhatsApp
            </a>
          )}
          {business.website && (
            <a
              href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Website
            </a>
          )}
          {business.lat != null && business.lng != null && (
            <a
              href={`https://www.google.com/maps?q=${business.lat},${business.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Directions
            </a>
          )}
        </div>

        {business.address && (
          <p className="mt-4 text-sm text-zinc-600">
            <span className="font-medium text-zinc-700">Address:</span> {business.address}
          </p>
        )}

        {business.tags && business.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {business.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <section className="mt-10 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
          <p className="font-medium text-zinc-900">Want more visibility?</p>
          <Link
            href="/list-your-business"
            className="mt-2 inline-block text-sm font-medium text-blue-700 hover:underline"
          >
            List or upgrade your business →
          </Link>
        </section>
      </div>
    </>
  );
}

