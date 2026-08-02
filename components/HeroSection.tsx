'use client';

import React from 'react';
import { Compass, Shield, Gauge, ArrowDownRight, Layers, Cpu, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Subtle Specular Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/20 text-white text-xs font-medium mb-6 backdrop-blur-sm shadow-sm">
          <Compass className="w-3.5 h-3.5 text-white" strokeWidth={1.25} />
          <span>Curated 5TB Digital Stock Vault</span>
          <span className="w-1 h-1 rounded-full bg-zinc-500" />
          <span className="text-zinc-300">Monochrome Fine-Glass Edition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Premium HD Video Bundles <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            For Viral Creators & Editors
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Instant lifetime download access to curated 4K reels, gym aesthetics, motivational speech edits, luxury supercars, and AI motion clips. Zero watermarks, royalty-free.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#catalog"
            className="glass-button-primary px-7 py-3.5 rounded-2xl text-sm font-bold text-black flex items-center gap-2 shadow-lg"
          >
            <ArrowDownRight className="w-4 h-4 text-black" strokeWidth={1.5} />
            <span>Explore Catalog (10,000+ Clips)</span>
          </a>

          <a
            href="#pricing"
            className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-white/40 transition-all flex items-center gap-2"
          >
            <Gauge className="w-4 h-4 text-white" strokeWidth={1.25} />
            <span>Unlimited Pass ₹299/mo</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10 text-xs font-medium text-zinc-400">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <Shield className="w-4 h-4 text-white" strokeWidth={1.25} />
            <span>Instant Zip Downloads</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <Cpu className="w-4 h-4 text-white" strokeWidth={1.25} />
            <span>Direct Google Drive API</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <Layers className="w-4 h-4 text-white" strokeWidth={1.25} />
            <span>Commercial Use License</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/10">
            <Award className="w-4 h-4 text-white" strokeWidth={1.25} />
            <span>Unwatermarked Assets</span>
          </div>
        </div>

      </div>
    </section>
  );
};
