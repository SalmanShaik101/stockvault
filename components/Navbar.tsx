'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, FolderDown, Upload, ShieldCheck, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              StockVault <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">PRO</span>
            </span>
            <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-medium">5TB Digital Media Vault</span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search 10,000+ HD Reels (Gym, Cars, Motivation, AI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-white/10">
            ⌘K
          </kbd>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/library"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all"
          >
            <FolderDown className="w-4 h-4 text-indigo-400" />
            <span>My Library</span>
          </Link>

          <Link
            href="/admin/upload"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all"
          >
            <Upload className="w-4 h-4 text-zinc-400" />
            <span>Admin Upload</span>
          </Link>

          <Link
            href="#pricing"
            className="glass-button-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-white/20" />
            <span>Get Membership</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
