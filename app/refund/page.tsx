'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function NoRefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>NO REFUND POLICY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">No Refund Policy</h1>
          <p className="text-xs text-zinc-400">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          <section className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-medium">
            ⚠️ <strong>Important Notice:</strong> Due to the instant, digital nature of our 4K video vaults and Google Drive downloads, <strong>all sales and subscription payments are final and non-refundable</strong> once digital access has been granted.
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Why Digital Goods Are Non-Refundable</h2>
            <p>
              StockVault provides direct, unwatermarked 4K and 9:16 vertical video assets via direct Google Drive links. Because digital video files cannot be returned or revoked once downloaded to your device, we enforce a strict <strong>No Refund Policy</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Try Previews Before Purchasing</h2>
            <p>
              We provide free, instant video previews for every single vault on our catalog so you can inspect video quality, resolution, and clip counts before completing your purchase.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Subscription Cancellations</h2>
            <p>
              If you hold a StockVault Plus monthly pass (₹499/mo), you can cancel your subscription at any time with a single click. Your access will remain active until the end of your paid billing period, and no further monthly charges will occur.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Broken Links & Technical Assistance</h2>
            <p className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              100% Download Guarantee:
            </p>
            <p>
              If you experience any issue downloading your files or encounter a broken Google Drive link, our support team will replace your link or fix access within 24 hours. Contact us at <span className="text-purple-300 underline font-mono">support@stockvault.pro</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
