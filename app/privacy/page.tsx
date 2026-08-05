'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
            <Shield className="w-3.5 h-3.5" />
            <span>LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-zinc-400">Last updated: August 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
            <p>
              At StockVault, we prioritize your privacy. When you purchase a digital stock video vault or subscribe to StockVault Plus, we collect minimal necessary details including your name, email address, and order transaction IDs processed securely through Razorpay.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. How We Use Your Data</h2>
            <p>
              Your information is exclusively used to grant instant digital access to your purchased video vaults via Google Drive, manage your membership subscription, and deliver customer support. We never sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Payment & Security</h2>
            <p>
              All payments are processed via Razorpay's 256-bit SSL encrypted payment gateway. StockVault does not store or access your credit card numbers, debit card PINs, or UPI credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Cookies & Analytics</h2>
            <p>
              We use essential session cookies to keep you logged in and ensure smooth streaming and download links. Anonymous analytics data helps us optimize video vault speeds and search performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Contact Support</h2>
            <p>
              If you have any questions regarding your data privacy, feel free to contact our support team at <span className="text-purple-300 underline font-mono">support@stockvault.pro</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
