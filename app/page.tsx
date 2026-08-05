'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategoryFilterBar } from '@/components/CategoryFilterBar';
import { ProductCard } from '@/components/ProductCard';
import { ProductPreviewModal } from '@/components/ProductPreviewModal';
import { Footer } from '@/components/Footer';
import { Category, Product } from '@/types';
import { Sparkles, Check, HelpCircle, Loader2 } from 'lucide-react';

const CATEGORIES: Category[] = [
  { id: 'cat_all', name: 'All Bundles', slug: 'all', description: 'Complete stock video catalog', iconName: 'Sparkles', count: 27 },
  { id: 'cat_gym', name: 'Gym & Fitness', slug: 'gym', description: 'Bodybuilding & workout reels', iconName: 'Dumbbell', count: 5 },
  { id: 'cat_motivation', name: 'Motivation & Mindset', slug: 'motivation', description: 'Cinematic speech reels', iconName: 'Zap', count: 4 },
  { id: 'cat_cars', name: 'Cars & Supercars', slug: 'cars', description: '4K hypercar reels', iconName: 'Car', count: 4 },
  { id: 'cat_luxury', name: 'Luxury & Lifestyle', slug: 'luxury', description: 'Penthouse & yacht footage', iconName: 'Crown', count: 4 },
  { id: 'cat_ai', name: 'AI & Futuristic', slug: 'ai', description: 'Cyberpunk visuals', iconName: 'Cpu', count: 5 },
  { id: 'cat_kids', name: 'Kids & Learning', slug: 'kids', description: '3D educational reels', iconName: 'Smile', count: 3 },
  { id: 'cat_comedy', name: 'Comedy & Memes', slug: 'comedy', description: 'Viral funny edits', iconName: 'Laugh', count: 2 },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const query = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
        const res = await fetch(`/api/products${query}`);
        const json = await res.json();
        
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        } else {
          const resAll = await fetch('/api/products');
          const jsonAll = await resAll.json();
          if (jsonAll.data && Array.isArray(jsonAll.data)) {
            setProducts(jsonAll.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  const handleBuyNow = async (product: Product) => {
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.productId }),
      });
      const data = await res.json();

      if (data.success) {
        setToastMessage(`🎉 Order initialized! Direct download for "${product.title}" starting...`);
        setTimeout(() => {
          window.location.href = `/api/download/${data.orderId || 'ord_101928374'}`;
        }, 1500);
      }
    } catch (err) {
      setToastMessage('Failed to initialize checkout. Please try again.');
    } finally {
      setTimeout(() => setToastMessage(null), 5000);
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
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            <span className="text-xs font-mono">Loading 4K Stock Vaults...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPreview={setPreviewProduct}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}

        {/* Pricing / Pass Section */}
        <section id="pricing" className="pt-16 border-t border-white/10">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden max-w-4xl mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                STOCKVAULT UNLIMITED ACCESS
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Download Everything For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-400">
                  Just ₹499 / Month
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
                <a
                  href="/pass"
                  className="inline-block glass-button-primary px-8 py-4 rounded-2xl text-sm font-bold text-black hover:scale-105 transition-all shadow-xl"
                >
                  Start Unlimited Pass — ₹499/mo
                </a>
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
                  Yes, 100%! Every bundle includes a royalty-free commercial editing license. You can freely edit, add music, monetize, and publish on social media or client videos.
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card space-y-2">
                <h4 className="font-bold text-sm text-white">What if a Google Drive link is broken or slow?</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  All files are backed up on Google Drive enterprise servers. If you encounter any download issue, our automated API fallback delivers your files instantly from server mirrors.
                </p>
              </div>
            </div>
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
