'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Tag, 
  Image as ImageIcon, 
  PhoneCall, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import TopNav from '@/components/layout/TopNav';

const STEPS = [
  { id: 'basics', title: 'Basics', icon: Building2 },
  { id: 'location', title: 'Location', icon: MapPin },
  { id: 'category', title: 'Category', icon: Tag },
  { id: 'contact', title: 'Contact', icon: PhoneCall },
  { id: 'details', title: 'Details', icon: Clock },
  { id: 'photos', title: 'Photos', icon: ImageIcon },
  { id: 'review', title: 'Review', icon: CheckCircle2 },
];

export default function AddBusinessFunnel() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    category: '',
    phone: '',
    whatsapp: '',
    website: '',
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Stepper */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -translate-y-1/2 -z-10" />
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border shadow-lg",
                idx <= currentStep 
                  ? "bg-gold border-gold text-zinc-950 scale-110 shadow-gold/20" 
                  : "bg-card border-border text-muted-foreground"
              )}>
                <step.icon size={18} />
              </div>
              <span className={cn(
                "text-[10px] uppercase font-bold tracking-widest hidden md:block",
                idx <= currentStep ? "text-gold" : "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Sparkles size={200} className="text-gold" />
          </div>

          <div className="relative z-10">
            <header className="mb-10">
              <h2 className="text-3xl font-serif font-bold mb-2">
                {STEPS[currentStep].title} Details
              </h2>
              <p className="text-muted-foreground">
                Step {currentStep + 1} of {STEPS.length}: Provide accurate information to earn 
                <span className="text-gold font-bold"> +50 Points</span>.
              </p>
            </header>

            {/* Dynamic Step Content */}
            <div className="min-h-[300px] animate-in fade-in slide-in-from-right-4 duration-500">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Business Legal Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Royal Jaipur Cafe"
                      className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 text-lg focus:border-gold/50 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Short Description</label>
                    <textarea 
                      placeholder="Tell customers what makes your business special..."
                      className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 min-h-[120px] focus:border-gold/50 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 flex gap-4 items-center mb-6">
                    <MapPin className="text-blue-400 shrink-0" />
                    <p className="text-sm text-blue-100/70">
                      Our system uses **Digital Pins**. Click the map to precisely mark your entrance for easier navigation.
                    </p>
                  </div>
                  <div className="h-64 bg-zinc-900 rounded-3xl border border-border flex items-center justify-center text-zinc-600 italic">
                    [ Interactive Map Component Loading... ]
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search Street Address..."
                    className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-6 focus:border-gold/50 outline-none transition-all"
                  />
                </div>
              )}

              {/* Other steps would be implemented similarly */}
              {currentStep > 1 && (
                <div className="flex flex-col items-center justify-center h-[300px] text-zinc-500 italic">
                  Step content for "{STEPS[currentStep].title}" is being optimized...
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold active:scale-95"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              
              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-10 py-3 rounded-xl bg-gradient-to-br from-gold to-gold-light text-zinc-950 font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/10 text-sm"
              >
                {currentStep === STEPS.length - 1 ? 'Finish & Submit' : 'Next Step'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
