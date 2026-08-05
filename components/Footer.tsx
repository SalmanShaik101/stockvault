'use client';

import React from 'react';
import Link from 'next/link';
import { Hexagon, Shield, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black/90 text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center">
                <Hexagon className="w-4 h-4 text-black" strokeWidth={1.5} />
              </div>
              <span className="font-extrabold text-base text-white">StockVault</span>
            </Link>
            <p className="text-zinc-500 leading-relaxed">
              The premier 5TB digital stock video marketplace. Curated high-bitrate vertical and 4K footage for modern content creators.
            </p>
          </div>

          {/* Categories Col */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Top Vaults</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/#catalog" className="hover:text-white transition-colors">Gym & Fitness Reels</Link></li>
              <li><Link href="/#catalog" className="hover:text-white transition-colors">Supercars & Luxury 4K</Link></li>
              <li><Link href="/#catalog" className="hover:text-white transition-colors">Viral Motivation Edits</Link></li>
              <li><Link href="/#catalog" className="hover:text-white transition-colors">AI & Cyberpunk Visuals</Link></li>
            </ul>
          </div>

          {/* Account Col */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Customer Portal</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/library" className="hover:text-white transition-colors">My Purchased Bundles</Link></li>
              <li><Link href="/pass" className="hover:text-white transition-colors">Monthly Unlimited Pass (₹499/mo)</Link></li>
              <li><span className="text-zinc-500">Commercial License Included</span></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Secure Checkout</h4>
            <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.03] p-3 rounded-xl border border-white/10">
              <Shield className="w-5 h-5 text-white shrink-0" strokeWidth={1.25} />
              <span>Razorpay 256-Bit SSL Encrypted Payment Gateway</span>
            </div>
            <div className="flex items-center gap-3 pt-1 text-zinc-500 text-[10px]">
              <span className="flex items-center gap-1"><CreditCard className="w-3 h-3 text-zinc-400" strokeWidth={1.25} /> UPI</span>
              <span>•</span>
              <span>Google Pay</span>
              <span>•</span>
              <span>Visa / Mastercard</span>
              <span>•</span>
              <span>NetBanking</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <p>© 2026 StockVault Inc. All rights reserved. Powered by Next.js & Google Drive API v3.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link 
              href="/privacy" 
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-zinc-200 hover:text-white border border-white/15 hover:border-white/40 font-medium transition-all shadow-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-zinc-200 hover:text-white border border-white/15 hover:border-white/40 font-medium transition-all shadow-sm"
            >
              Terms of Service
            </Link>
            <Link 
              href="/refund" 
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-500/60 font-medium transition-all shadow-sm"
            >
              No Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
