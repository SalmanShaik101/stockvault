'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, FolderArchive, ArrowUpRight, Hexagon, Command, Gem } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/15 bg-black/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform duration-300">
            <Hexagon className="w-5 h-5 text-black" strokeWidth={1.5} />
          </div>
          <div className="flex items-center">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              StockVault <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/20 font-mono tracking-widest uppercase">PRO</span>
            </span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" strokeWidth={1.25} />
          <input
            type="text"
            placeholder="Search 10,000+ HD Reels (Gym, Cars, Motivation)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/15 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition-all font-sans"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-400 bg-zinc-900/90 px-1.5 py-0.5 rounded border border-white/10">
            <Command className="w-2.5 h-2.5" strokeWidth={1.25} /> K
          </kbd>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/library"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/15 transition-all"
          >
            <FolderArchive className="w-4 h-4 text-white" strokeWidth={1.25} />
            <span>My Library</span>
          </Link>

          <Link
            href="/admin/upload"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/15 transition-all"
          >
            <ArrowUpRight className="w-4 h-4 text-zinc-400" strokeWidth={1.25} />
            <span>Admin Upload</span>
          </Link>

          <Link
            href="#pricing"
            className="glass-button-primary px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5"
          >
            <Gem className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
            <span>Get Pass</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
