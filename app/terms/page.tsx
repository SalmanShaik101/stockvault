'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>TERMS & CONDITIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-zinc-400">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing StockVault or purchasing any stock video vault or membership pass, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Digital Product License</h2>
            <p>
              Purchasing a vault or StockVault Plus subscription grants you a non-exclusive, worldwide, royalty-free commercial editing license to use, edit, mix, and publish the footage across social media (YouTube, Instagram, TikTok, Facebook) and client projects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Prohibited Usage</h2>
            <p>
              You are strictly prohibited from reselling, sublicensing, repackaging, or redistributing the raw standalone video files as your own stock footage product or digital library.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Account & Download Security</h2>
            <p>
              Your download links and membership credentials are intended for your individual creator use. Automated scraping or sharing download links publicly is subject to instant account suspension.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. Any legal inquiries can be sent to <span className="text-purple-300 underline font-mono">legal@stockvault.pro</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
