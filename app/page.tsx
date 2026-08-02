'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategoryFilterBar } from '@/components/CategoryFilterBar';
import { ProductCard } from '@/components/ProductCard';
import { ProductPreviewModal } from '@/components/ProductPreviewModal';
import { Footer } from '@/components/Footer';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';
import { Product } from '@/types';
import { Sparkles, Check, HelpCircle } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [purchasingProduct, setPurchasingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleBuyNow = async (product: Product) => {
    setPurchasingProduct(product);
    
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
          window.location.href = `/api/download/${data.orderId || 'ord_mock_101'}`;
        }, 1500);
      }
    } catch (err) {
      setToastMessage('Failed to initialize checkout. Try again.');
    } finally {
      setTimeout(() => setToastMessage(null), 5000);
      setPurchasingProduct(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      {/* Hero Banner */}
      <HeroSection />

      {/* Marketplace Catalog Section */}
      <main id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        
        {/* Category Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <span>Browse Stock Vaults</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20 font-mono">
                {filteredProducts.length} Vaults Available
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select a category below to explore unwatermarked 4K and 9:16 vertical video packs.
            </p>
          </div>

          <CategoryFilterBar
            categories={MOCK_CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreview={setPreviewProduct}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>

        {/* Membership Pricing Section */}
        <section id="pricing" className="pt-16 pb-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                STOCKVAULT UNLIMITED ACCESS
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Download Everything For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  Just ₹299 / Month
                </span>
              </h2>

              <p className="text-sm text-zinc-400 max-w-xl mx-auto">
                Gain instant access to all 5TB of Gym, Supercar, Motivation, Luxury, and AI reels with zero daily limits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto text-xs text-zinc-300 pt-4">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Unlimited 5TB Bundle Access</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Google Drive Direct High-Speed</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>Commercial Reseller License</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handleBuyNow(MOCK_PRODUCTS[0])}
                  className="glass-button-primary px-8 py-4 rounded-2xl text-sm font-bold text-black hover:scale-105 transition-all"
                >
                  Start Unlimited Pass — ₹299/mo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-12 border-t border-white/10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-white" />
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-zinc-400">Everything you need to know about purchasing and downloading stock bundles.</p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl glass-card space-y-2">
                <h4 className="font-bold text-sm text-white">How do I receive my downloaded files after payment?</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Immediately after your Razorpay payment succeeds, our backend system retrieves the Google Drive File ID (`driveFileId`) for your bundle and streams the private ZIP file directly to your browser or My Library portal.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card space-y-2">
                <h4 className="font-bold text-sm text-white">Can I use these reels for Instagram, YouTube, and TikTok monetization?</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yes! Every bundle includes a Commercial & Personal Use License. You can edit, add audio, or upload clips directly without copyright strikes.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card space-y-2">
                <h4 className="font-bold text-sm text-white">Why store files using Google Drive File IDs instead of public links?</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Using `driveFileId` ensures your files remain 100% private and protected. Your backend acts as a secure download gateway, preventing unauthorized folder browsing.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Preview Modal */}
      <ProductPreviewModal
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
        onBuyNow={handleBuyNow}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-zinc-900 border border-white/20 text-white text-xs font-semibold shadow-2xl backdrop-blur-md animate-bounce">
          {toastMessage}
        </div>
      )}

      <Footer />
    </div>
  );
}
