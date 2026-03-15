import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Search, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

// Conceptually, this would fetch from Neon DB
async function getCityData(slug: string) {
  // const city = await sql`SELECT * FROM cities WHERE slug = ${slug}`;
  // return city[0];
  
  // Mock data for demonstration
  return {
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    state: "India",
    count: 1240,
    description: `Find the best verified local businesses in ${slug}. From top-rated restaurants to registered professional services, explore India's digital map.`
  };
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityData(slug);
  return {
    title: `Best Businesses in ${city.name} | SKM Studio Maps`,
    description: `Explore ${city.count}+ verified local business listings in ${city.name}, ${city.state}. Real reviews, instant contact, and digital maps.`,
  };
}

export default async function CityLandingPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = await getCityData(slug);
  
  if (!city) notFound();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-sm mb-6">
            <MapPin size={14} />
            Explore {city.state}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Best Businesses in <span className="gold-text">{city.name}</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {city.description}
          </p>
          
          {/* Programmatic Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder={`Search in ${city.name}...`}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:border-gold/50 outline-none transition-all shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats/Proof Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Verified Listings", val: city.count, icon: ShieldCheck },
            { label: "Phone Verified", val: "98%", icon: Zap },
            { label: "Avg Rating", val: "4.8", icon: Star },
            { label: "Available 24/7", val: "Online", icon: Search },
          ].map((stat, i) => (
            <div key={i} className="premium-card text-center">
              <stat.icon className="mx-auto mb-3 text-gold" size={24} />
              <div className="text-2xl font-bold text-white">{stat.val}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid - This would also be dynamic */}
      <section className="px-6 py-20 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            Popular Categories in {city.name}
            <div className="h-px flex-1 bg-zinc-800"></div>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Restaurants', 'Real Estate', 'Healthcare', 'Education', 'IT Services', 'Manufacturing'].map((cat) => (
              <a href={`/city/${slug}/${cat.toLowerCase()}`} key={cat} className="premium-card group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-gold transition-colors">{cat}</h3>
                    <p className="text-sm text-zinc-500">Explore top {cat.toLowerCase()} in the city.</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
                    →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
