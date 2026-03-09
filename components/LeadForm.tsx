"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase-client";
import type { Category, City } from "../types/database";

type Props = {
  categories: Category[];
  cities: City[];
  className?: string;
  sourcePage?: string;
};

export default function LeadForm({
  categories,
  cities,
  className = "",
  sourcePage,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const parts: string[] = [message];
    if (businessName) parts.push(`Business: ${businessName}`);
    if (categoryId) {
      const cat = categories.find((c) => c.id === categoryId);
      if (cat) parts.push(`Category: ${cat.name}`);
    }
    if (cityId) {
      const city = cities.find((c) => c.id === cityId);
      if (city) parts.push(`City: ${city.name}`);
    }
    const fullMessage = parts.filter(Boolean).join("\n");
    try {
      const { error } = await supabase.from("leads").insert({
        name,
        phone,
        email: email || null,
        message: fullMessage || null,
        source_page: sourcePage ?? "list-your-business",
        business_id: null,
      });
      if (error) throw error;
      setStatus("done");
      setName("");
      setPhone("");
      setEmail("");
      setBusinessName("");
      setCategoryId("");
      setCityId("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={`rounded-xl border border-green-200 bg-green-50 p-6 text-center ${className}`}>
        <p className="font-medium text-green-800">Thank you!</p>
        <p className="mt-1 text-sm text-green-700">
          We’ve received your details and will get in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            Your name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
          />
        </div>
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-zinc-700">
            Business name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
          />
        </div>
        {categories.length > 0 && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-700">
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {cities.length > 0 && (
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-zinc-700">
              City
            </label>
            <select
              id="city"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
            Message
          </label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
            placeholder="e.g. I want a featured listing in Delhi for my salon."
          />
        </div>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
