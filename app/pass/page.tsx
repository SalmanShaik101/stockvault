'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Gem, 
  Check, 
  Zap, 
  ShieldCheck, 
  Crown, 
  Video, 
  DownloadCloud, 
  Infinity as InfinityIcon,
  HelpCircle
} from 'lucide-react';
import { AnimatedBuyButton } from '@/components/ui/animated-buy-button';

export default function PlusMembershipPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubscribe = async (planType: 'monthly' | 'yearly') => {
    const price = planType === 'monthly' ? 499 : 3999;
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: `PASS_${planType.toUpperCase()}`, amount: price }),
      });
      const data = await res.json();

      if (data.success) {
        setToastMessage(`🎉 Unlimited Pass activated! Redirecting to your VIP Library...`);
        setTimeout(() => {
          window.location.href = '/library';
        }, 1800);
      }
    } catch (err) {
      setToastMessage('Failed to initialize subscription. Please try again.');
    } finally {
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Header Hero */}
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center border border-purple-500/30 shadow-2xl bg-gradient-to-b from-[#0e081c] via-[#1a0c36] to-[#2d0e5c]">
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 120%, rgba(168, 85, 247, 0.45) 0%, rgba(107, 33, 168, 0.25) 45%, rgba(14, 8, 28, 0) 80%)'
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-200 text-xs font-semibold backdrop-blur-xl shadow-lg">
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>STOCKVAULT PLUS VIP MEMBERSHIP</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Unlock All 10,000+ 4K Stock Vaults <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-purple-200 to-purple-400">
                For Unlimited Downloads
              </span>
            </h1>

            <p className="text-base sm:text-lg text-purple-100/80 leading-relaxed font-normal max-w-2xl mx-auto">
              Get complete, unrestricted lifetime access to every video pack, weekly new releases, and full commercial monetization rights.
            </p>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Monthly Pass (₹499/mo) */}
          <div className="relative glass-panel rounded-3xl p-8 border-2 border-purple-500/40 shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-b from-purple-950/40 to-black/80">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[11px] font-bold">
              MOST POPULAR
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  <Gem className="w-6 h-6 text-purple-400" />
                  StockVault Plus
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Monthly Creator Unlimited Pass</p>
              </div>

              <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
                <span className="text-4xl sm:text-5xl font-black text-white">₹499</span>
                <span className="text-sm text-zinc-400 font-medium">/ month</span>
              </div>

              <ul className="space-y-3.5 text-xs text-zinc-200 pt-4 border-t border-white/10">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" strokeWidth={2.5} />
                  <span><strong>Unlimited Downloads</strong> across all 27+ Stock Vaults</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" strokeWidth={2.5} />
                  <span><strong>Direct High-Speed Google Drive</strong> links</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" strokeWidth={2.5} />
                  <span><strong>Weekly New Releases</strong> added every Monday</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" strokeWidth={2.5} />
                  <span><strong>Full Commercial License</strong> (YouTube, Instagram, Clients)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" strokeWidth={2.5} />
                  <span><strong>100% Unwatermarked</strong> 4K & 9:16 vertical MP4s</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <AnimatedBuyButton
                price={499}
                label="Get Monthly Pass (₹499/mo)"
                onClick={() => handleSubscribe('monthly')}
                className="w-full justify-center text-sm py-3.5"
              />
            </div>
          </div>

          {/* Lifetime Unlimited Pass (₹3,999 Lifetime) */}
          <div className="relative glass-panel rounded-3xl p-8 border border-white/15 shadow-xl flex flex-col justify-between overflow-hidden bg-black/60">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  <Crown className="w-6 h-6 text-amber-400 fill-amber-400" />
                  VIP Lifetime Pass
                </h3>
                <p className="text-xs text-zinc-400 mt-1">One-time payment • Pay once, own forever</p>
              </div>

              <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
                <span className="text-4xl sm:text-5xl font-black text-white">₹3,999</span>
                <span className="text-sm text-zinc-500 line-through">₹9,999</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">SAVE 60%</span>
              </div>

              <ul className="space-y-3.5 text-xs text-zinc-300 pt-4 border-t border-white/10">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                  <span><strong>Forever Unlimited Access</strong> with zero monthly fees</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                  <span>Includes all future 2026/2027 vault updates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                  <span>Dedicated VIP Creator Discord & Drive Storage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                  <span>Priority 1-on-1 Request Line for Custom Footage</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <AnimatedBuyButton
                price={3999}
                label="Get Lifetime Pass (₹3,999)"
                onClick={() => handleSubscribe('yearly')}
                className="w-full justify-center text-sm py-3.5"
              />
            </div>
          </div>

        </div>

        {/* What You Get Features Breakdown Grid */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Why Creators Upgrade to StockVault Plus
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Everything you need to create viral Instagram Reels, YouTube Shorts, and TikTok videos without copyright strikes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <InfinityIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Unlimited Vault Downloads</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Download as many 4K video packs as you need. No daily caps, bandwidth limits, or hidden fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <DownloadCloud className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Direct Google Drive Links</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                High-speed 1-click downloads powered by Google Drive API. Store directly into your own Google Drive or phone.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Commercial Editing License</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Monetize your content freely across YouTube, Instagram, Facebook, and client videos with 100% royalty-free protection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">4K & Vertical 9:16 Format</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pre-formatted 1080x1920 vertical reels and 4K horizontal clips ready to drop into Premiere Pro, CapCut, or DaVinci.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Weekly Vault Drops</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fresh trending packs added every week covering gym aesthetics, supercar edits, anime, gaming, and viral speech clips.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white">VIP Creator Support</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct WhatsApp & email support for custom clip requests, broken links, or specific theme searches.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h4 className="font-bold text-white text-sm mb-1">How do I access my downloads after paying ₹499?</h4>
              <p className="text-zinc-400">
                Immediately after your payment completes, your account is upgraded to VIP status and direct Google Drive access links will appear in your "My Library" page.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h4 className="font-bold text-white text-sm mb-1">Can I use these video clips for commercial client work?</h4>
              <p className="text-zinc-400">
                Yes! Every video in StockVault comes with a commercial license allowing you to edit, post, and sell video projects to clients.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h4 className="font-bold text-white text-sm mb-1">Can I cancel my monthly subscription anytime?</h4>
              <p className="text-zinc-400">
                Yes, you can cancel your ₹499/month membership anytime with a single click from your profile page without any cancellation fees.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-white text-black font-semibold text-xs shadow-2xl border border-white/20 animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
