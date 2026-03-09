import type { Metadata } from "next";
import LeadForm from "../../components/LeadForm";
import { getCategories, getCities } from "../../lib/data";

export const metadata: Metadata = {
  title: "List your business",
  description:
    "Get your business listed on India Directory. Featured listings get top placement and more customers. Affordable monthly and annual plans.",
};

export default async function ListYourBusinessPage() {
  const [categories, cities] = await Promise.all([
    getCategories(),
    getCities(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900">List your business</h1>
      <p className="mt-2 text-zinc-600">
        Fill in the form below. We’ll get in touch to confirm details and discuss featured listing options.
      </p>

      <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
        <h2 className="font-semibold text-zinc-900">Why get featured?</h2>
        <ul className="mt-2 list-inside list-disc text-sm text-zinc-700">
          <li>Top placement in your city and category</li>
          <li>More calls and WhatsApp clicks</li>
          <li>Verified badge for trust</li>
          <li>Affordable monthly or annual plans</li>
        </ul>
      </section>

      <LeadForm categories={categories} cities={cities} className="mt-8" />
    </div>
  );
}
