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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Browse Stock Vaults
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreview={setPreviewProduct}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>

        {/* Pricing / Pass Section */}
        <section id="pricing" className="pt-16 border-t border-white/10">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              <span>Unlimited Access Pass</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Get Every Vault for ₹299/mo
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
              Unlock unlimited high-speed downloads across all 10,000+ 4K reels, new weekly releases, and commercial editing licenses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-8 text-xs text-zinc-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Check className="w-4 h-4 text-white" strokeWidth={1.5} />
                <span>All 27+ Stock Vaults Included</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Check className="w-4 h-4 text-white" strokeWidth={1.5} />
                <span>Unlimited Google Drive Downloads</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Check className="w-4 h-4 text-white" strokeWidth={1.5} />
                <span>Cancel Anytime with 1 Click</span>
              </div>
            </div>

            <button
              onClick={() => handleBuyNow(MOCK_PRODUCTS[0])}
              className="glass-button-primary px-8 py-4 rounded-2xl text-sm font-bold text-black shadow-xl"
            >
              Start Unlimited Membership (₹299/mo)
            </button>
          </div>
        </section>

      </main>

      <Footer />

      {/* Video Preview Modal */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-white text-black font-semibold text-xs shadow-2xl border border-white/20 animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
