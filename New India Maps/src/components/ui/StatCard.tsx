import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: {
    value: number;
    isUp: boolean;
  };
  icon?: LucideIcon;
  accentColor?: string; // e.g. 'var(--gold)'
}

export default function StatCard({ 
  label, 
  value, 
  delta, 
  icon: Icon,
  accentColor = 'var(--gold)' 
}: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden group hover:border-gold/30 transition-all duration-300 shadow-sm hover:shadow-gold/5">
      {/* Background Accent from Mockup */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-[100px] opacity-10 transition-opacity group-hover:opacity-20" 
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-secondary/50 rounded-lg group-hover:bg-secondary transition-colors">
            {Icon && <Icon className="w-4.5 h-4.5 text-zinc-400 group-hover:text-gold transition-colors" />}
          </div>
          
          {delta && (
            <div className={cn(
              "px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1",
              delta.isUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
            )}>
              {delta.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {delta.value}%
            </div>
          )}
        </div>

        <div className="mt-4 font-serif text-3xl font-bold tracking-tight text-foreground">
          {value}
        </div>
        
        <div className="text-[12px] text-muted-foreground font-medium mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}
