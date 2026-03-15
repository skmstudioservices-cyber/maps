'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  TrendingUp,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import TopNav from '@/components/layout/TopNav';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold-light text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Globe size={14} className="animate-spin-slow" />
            India's Open Knowledge Network
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Find the Heart of <br />
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent italic">
              Local India.
            </span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Discover verified businesses, real reviews, and digital maps. 
            Join thousands of <span className="text-gold font-semibold">Trusted Guides</span> mapping the nation.
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-gold transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search for doctors, cafes, or services..."
                className="w-full bg-card border border-border group-hover:border-gold/30 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all shadow-xl"
              />
            </div>
            <Link 
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-gold to-gold-light text-zinc-950 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Trending Cities</h2>
              <p className="text-muted-foreground max-w-md">Discover high-growth business hubs mapped by our dedicated contributor network.</p>
            </div>
            <Link href="/cities" className="text-gold font-bold text-sm tracking-widest uppercase hover:underline flex items-center gap-2">
              View All 500+ Cities
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Jaipur', state: 'Rajasthan', count: '1.2k+', image: 'var(--gold-dim)' },
              { name: 'Bangalore', state: 'Karnataka', count: '4.8k+', image: 'var(--blue-dim)' },
              { name: 'Mumbai', state: 'Maharashtra', count: '12k+', image: 'rgba(46,204,138,0.1)' },
              { name: 'Delhi', state: 'NCR', count: '9k+', image: 'rgba(155,89,182,0.1)' },
            ].map((city, i) => (
              <Link 
                key={i}
                href={`/city/${city.name.toLowerCase()}`}
                className="group relative h-64 bg-card border border-border rounded-3xl overflow-hidden hover:border-gold/50 transition-all duration-500"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: city.image }} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="text-xs font-bold text-gold uppercase tracking-widest mb-1">{city.state}</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform">{city.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{city.count} Verified Listings</span>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-gold group-hover:text-zinc-950 transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section className="px-6 py-32 bg-secondary/30 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="text-gold font-bold tracking-[0.2em] uppercase text-sm">Real Integrity</div>
            <h2 className="text-5xl font-serif font-bold leading-tight">We verify, <br />So you can <span className="italic">Trust.</span></h2>
            
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: 'Verified Contacts', desc: 'Every phone number and WhatsApp link is strictly validated by our moderator team.' },
                { icon: Sparkles, title: 'Gold Badge System', desc: 'Top-tier businesses undergo deep-scan verification to earn the SKM Gold Trust Badge.' },
                { icon: TrendingUp, title: 'Contributor Proof', desc: 'Our community of "Trusted Guides" uploads live visit proofs to verify business existence.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <item.icon className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gold/20 to-transparent absolute -inset-10 blur-3xl rounded-full opacity-50" />
            <div className="bg-card border border-border p-8 rounded-[2rem] shadow-2xl relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center font-bold text-zinc-950">SK</div>
                <div>
                  <div className="font-bold">Subhash Kumar</div>
                  <div className="text-xs text-gold">Master Contributor</div>
                </div>
                <div className="ml-auto flex gap-1">
                  {[1,2,3,4,5].map(s => <Award key={s} size={14} className="text-gold" />)}
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-4 bg-secondary rounded-full w-full" />
                <div className="h-4 bg-secondary rounded-full w-4/5" />
                <div className="h-4 bg-secondary rounded-full w-2/3" />
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-gold">1,240</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold">48</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Verifications</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-serif font-bold text-blue-400">#4</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
