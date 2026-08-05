'use client';

import React from 'react';
import { Shield, Gauge, ArrowDownRight, Layers, Cpu, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20 my-4 rounded-3xl mx-4 sm:mx-8 border border-purple-500/20 shadow-2xl bg-gradient-to-b from-[#08060d] via-[#120a24] to-[#250d4d]">
      
      {/* Deep Purple Radial Ambient Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 120%, rgba(147, 51, 234, 0.45) 0%, rgba(88, 28, 135, 0.25) 45%, rgba(8, 6, 13, 0) 80%)'
        }}
      />

      {/* Subtle Purple Specular Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6 drop-shadow-2xl">
          Premium HD Video Bundles <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400">
            For Viral Creators & Editors
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed mb-10 font-normal drop-shadow">
          Instant lifetime download access to curated 4K reels, gym aesthetics, motivational speech edits, luxury supercars, and AI motion clips. Zero watermarks, royalty-free.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#catalog"
            className="glass-button-primary px-8 py-4 rounded-2xl text-sm font-bold text-black flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"
          >
            <ArrowDownRight className="w-4 h-4 text-black" strokeWidth={2} />
            <span>Explore Catalog (10,000+ Clips)</span>
          </a>

          <a
            href="#pricing"
            className="px-8 py-4 rounded-2xl text-sm font-bold text-white bg-purple-950/50 hover:bg-purple-900/60 border border-purple-400/30 hover:border-purple-400/60 backdrop-blur-xl transition-all flex items-center gap-2 shadow-xl"
          >
            <Gauge className="w-4 h-4 text-purple-300" strokeWidth={1.5} />
            <span>Unlimited Pass ₹299/mo</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-purple-500/20 text-xs font-medium text-purple-200/80">
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md shadow-sm">
            <Shield className="w-4 h-4 text-purple-300" strokeWidth={1.5} />
            <span>Instant Zip Downloads</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md shadow-sm">
            <Cpu className="w-4 h-4 text-purple-300" strokeWidth={1.5} />
            <span>Direct Google Drive API</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md shadow-sm">
            <Layers className="w-4 h-4 text-purple-300" strokeWidth={1.5} />
            <span>Commercial Use License</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md shadow-sm">
            <Award className="w-4 h-4 text-purple-300" strokeWidth={1.5} />
            <span>Unwatermarked Assets</span>
          </div>
        </div>

      </div>
    </section>
  );
};
