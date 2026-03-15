'use client';

import React from 'react';
import TopNav from '@/components/layout/TopNav';
import StatCard from '@/components/ui/StatCard';
import { cn } from '@/lib/utils';
import { 
  Phone, 
  MessageSquare, 
  Eye, 
  MapPin, 
  Star, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Welcome back, Subhash</h1>
          <p className="text-muted-foreground text-sm">
            Your premium listings are currently active across <span className="text-gold font-bold">4 cities</span>.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Total Profile Views" 
            value="12,482" 
            icon={Eye} 
            delta={{ value: 14, isUp: true }}
            accentColor="var(--blue)"
          />
          <StatCard 
            label="Phone Call Clicks" 
            value="438" 
            icon={Phone} 
            delta={{ value: 8, isUp: true }}
            accentColor="var(--gold)"
          />
          <StatCard 
            label="WhatsApp Leads" 
            value="89" 
            icon={MessageSquare} 
            delta={{ value: 21, isUp: true }}
            accentColor="var(--green)"
          />
          <StatCard 
            label="Avg. Business Rating" 
            value="4.8" 
            icon={Star} 
            accentColor="var(--orange)"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Level Progress (Gamification) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32 text-gold" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Contributor Level: Explorer</h3>
                  <p className="text-sm text-muted-foreground font-medium">Next Reward: <span className="text-gold">1.5x Point Multiplier</span></p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-serif font-bold text-gold">850 <span className="text-[14px] text-muted-foreground font-sans">pts</span></div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Points Balance</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Progress to Contributor</span>
                  <span>850 / 1,000</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden border border-border/50">
                  <div 
                    className="h-full bg-gradient-to-r from-gold via-gold-light to-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]" 
                    style={{ width: '85%' }}
                  />
                </div>
                <p className="text-[11px] text-zinc-500 italic">
                  Tip: Get +10 points for every verified business detail you update today.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="premium-card group hover:scale-[1.02] cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">Add New Location</h4>
                    <p className="text-xs text-muted-foreground">Expand your business reach</p>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-zinc-600 group-hover:text-gold transition-colors" />
                </div>
              </div>

              <div className="premium-card group hover:scale-[1.02] cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                    <ShieldCheck className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">Verify Business</h4>
                    <p className="text-xs text-muted-foreground">Get the official Gold Trust Badge</p>
                  </div>
                  <ArrowRight className="ml-auto w-4 h-4 text-zinc-600 group-hover:text-gold transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed (Right Rail) */}
          <div className="bg-card border border-border rounded-3xl p-6 flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Recent Interactions</h3>
            
            <div className="space-y-6 flex-1">
              {[
                { type: 'Call', msg: 'New call inquiry from Mumbai', time: '12m ago', icon: Phone, color: 'text-gold' },
                { type: 'WA', msg: 'WhatsApp click from Gurgaon', time: '1hr ago', icon: MessageSquare, color: 'text-green-400' },
                { type: 'Review', msg: '5-star review left for Jaipur branch', time: '4hr ago', icon: Star, color: 'text-orange-400' },
                { type: 'System', msg: 'Monthly report is now available', time: '1d ago', icon: ShieldCheck, color: 'text-blue-400' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className={cn("w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border group-hover:border-gold/30 transition-all", item.color)}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{item.msg}</div>
                    <div className="text-[11px] text-zinc-500 uppercase tracking-tight">{item.type} • {item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border border-border rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-gold hover:border-gold/30 transition-all">
              View Detailed Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
