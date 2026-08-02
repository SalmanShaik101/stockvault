'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Lock, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-zinc-950/90 text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
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
              <li><Link href="/#catalog" className="hover:text-indigo-400 transition-colors">Gym & Fitness Reels</Link></li>
              <li><Link href="/#catalog" className="hover:text-indigo-400 transition-colors">Supercars & Luxury 4K</Link></li>
              <li><Link href="/#catalog" className="hover:text-indigo-400 transition-colors">Viral Motivation Edits</Link></li>
              <li><Link href="/#catalog" className="hover:text-indigo-400 transition-colors">AI & Cyberpunk Visuals</Link></li>
            </ul>
          </div>

          {/* Account Col */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Customer Portal</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><Link href="/library" className="hover:text-indigo-400 transition-colors">My Purchased Bundles</Link></li>
              <li><Link href="/admin/upload" className="hover:text-indigo-400 transition-colors">Admin Upload Panel</Link></li>
              <li><Link href="/#pricing" className="hover:text-indigo-400 transition-colors">Monthly Unlimited Pass</Link></li>
              <li><span className="text-zinc-500">Commercial License Included</span></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Secure Checkout</h4>
            <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.03] p-3 rounded-xl border border-white/5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Razorpay 256-Bit SSL Encrypted Payment Gateway</span>
            </div>
            <div className="flex items-center gap-3 pt-1 text-zinc-500 text-[10px]">
              <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> UPI</span>
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
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 StockVault Inc. All rights reserved. Powered by Next.js & Google Drive API v3.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
