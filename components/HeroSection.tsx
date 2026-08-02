'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Download, Layers } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated 5TB High-Definition Stock Vault</span>
          <span className="w-1 h-1 rounded-full bg-indigo-400" />
          <span className="text-white">9:16 Vertical & 16:9 4K Clips</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Premium HD Video Bundles <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500">
            For Viral Creators & Editors
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Instant lifetime download access to curated 4K reels, gym aesthetics, motivational speech edits, luxury supercars, and AI motion clips. Zero watermarks, royalty-free.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#catalog"
            className="glass-button-primary px-7 py-3.5 rounded-2xl text-sm font-bold text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Explore Catalog (10,000+ Clips)</span>
          </a>

          <a
            href="#pricing"
            className="px-7 py-3.5 rounded-2xl text-sm font-bold text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Unlimited Pass ₹299/mo</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10 text-xs font-medium text-zinc-400">
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Instant Zip Downloads</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>Direct Google Drive API</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Commercial Use License</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.02]">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>No Recurring Watermarks</span>
          </div>
        </div>

      </div>
    </section>
  );
};
