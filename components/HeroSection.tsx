'use client';

import React from 'react';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { Compass, Shield, Gauge, ArrowDownRight, Layers, Cpu, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <BackgroundPaths title="StockVault Pro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/25 text-white text-xs font-medium mb-6 backdrop-blur-md shadow-lg">
            <Compass className="w-3.5 h-3.5 text-indigo-400" strokeWidth={1.5} />
            <span>Curated 5TB Digital Stock Vault</span>
            <span className="w-1 h-1 rounded-full bg-zinc-500" />
            <span className="text-zinc-300">Animated Vector Paths Edition</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6 drop-shadow-2xl">
            Premium HD Video Bundles <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              For Viral Creators & Editors
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal drop-shadow-md">
            Instant lifetime download access to curated 4K reels, gym aesthetics, motivational speech edits, luxury supercars, and AI motion clips. Zero watermarks, royalty-free.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#catalog"
              className="glass-button-primary px-7 py-3.5 rounded-2xl text-sm font-bold text-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <ArrowDownRight className="w-4 h-4 text-black" strokeWidth={2} />
              <span>Explore Catalog (10,000+ Clips)</span>
            </a>

            <a
              href="#pricing"
              className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 hover:border-white/50 backdrop-blur-md transition-all flex items-center gap-2 shadow-lg"
            >
              <Gauge className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
              <span>Unlimited Pass ₹299/mo</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/15 text-xs font-medium text-zinc-300">
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-sm">
              <Shield className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
              <span>Instant Zip Downloads</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-sm">
              <Cpu className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
              <span>Direct Google Drive API</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-sm">
              <Layers className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
              <span>Commercial Use License</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-sm">
              <Award className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
              <span>Unwatermarked Assets</span>
            </div>
          </div>

        </div>
      </BackgroundPaths>
    </section>
  );
};
