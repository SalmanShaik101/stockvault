'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Product } from '@/types';
import { Star, ShieldCheck, Download, Clapperboard, Disc, Sparkles, CheckCircle2, Flame, ArrowLeft, Cpu, Award } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = (params?.id as string) || '';

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const product: Product = MOCK_PRODUCTS.find((p) => p.id === productId || p.productId === productId) || MOCK_PRODUCTS[0];

  const handleBuyNow = async () => {
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.productId }),
      });
      const data = await res.json();

      if (data.success) {
        setToastMessage(`🎉 Order initialized! Direct download for "${product.title}" is starting...`);
        setTimeout(() => {
          window.location.href = `/api/download/${data.orderId || 'ord_101928374'}`;
        }, 1500);
      }
    } catch (err) {
      setToastMessage('Failed to initialize checkout. Try again.');
    } finally {
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* Navigation Back */}
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Stock Vaults</span>
        </Link>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Banner Image */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/20 p-2 bg-black shadow-2xl relative">
              
              {/* Product Cover Image */}
              <div className="relative aspect-[16/9] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black">
                <img
                  src={product.thumbnailUrl}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-extrabold bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>🔥 Trending 4K Stock Vault</span>
                </span>
              </div>
            </div>

            {/* AI Quality Audit Score Showcase Card */}
            <div className="p-6 rounded-3xl glass-card border border-purple-500/30 space-y-4 bg-gradient-to-br from-purple-950/40 via-black to-black">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>StockAI Quality Audit Score</span>
                      <Award className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-[11px] text-zinc-400">Verified by DeepVision AI Video Quality Auditor</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-purple-300 flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span>{product.rating || '5.0'} / 5.0</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-zinc-400 text-[10px] block">4K Clarity</span>
                  <span className="font-extrabold text-emerald-400">100% Ultra HD</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-zinc-400 text-[10px] block">Viral Potential</span>
                  <span className="font-extrabold text-purple-400">98% High Retention</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-zinc-400 text-[10px] block">Color Grading</span>
                  <span className="font-extrabold text-amber-400">Cinematic HDR</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <span className="text-zinc-400 text-[10px] block">Copyright Claim</span>
                  <span className="font-extrabold text-emerald-400">0% No Claim</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specifications & Buy Action */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 inline-block">
                {product.category} Vault
              </span>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Massive unwatermarked collection of 4K cinematic video reels. Fully optimized for Instagram Reels, YouTube Shorts, and TikTok monetization with zero copyright issues.
              </p>
            </div>

            {/* Product Specifications Table */}
            <div className="p-5 rounded-2xl glass-card border border-white/15 space-y-3 bg-black/60">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                Technical Specifications
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Total Video Clips:</span>
                  <span className="text-white font-bold">{product.clipCount}+ Clips</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Resolution & Ratio:</span>
                  <span className="text-white font-bold">{product.resolution} (9:16 Vertical)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">File Format & Codec:</span>
                  <span className="text-white font-bold">{product.format} (Uncompressed MP4)</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Bundle Size:</span>
                  <span className="text-white font-bold">{product.fileSize}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Commercial Rights:</span>
                  <span className="text-emerald-400 font-bold">100% License Included</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Fulfillment Method:</span>
                  <span className="text-white font-bold">Google Drive Direct API Stream</span>
                </div>
              </div>
            </div>

            {/* Pricing & Buy CTA */}
            <div className="p-6 rounded-3xl glass-panel border border-white/20 space-y-4 bg-gradient-to-b from-white/[0.05] to-black">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-white">{formatCurrency(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through ml-2">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-bold">
                  Save 70% Today
                </span>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full glass-button-primary py-4 rounded-2xl text-sm font-extrabold text-black hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 text-black" />
                <span>Buy & Download Instant ZIP — {formatCurrency(product.price)}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Access
                </span>
              </div>
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
