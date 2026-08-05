'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Star, Clapperboard, Disc, CheckCircle, ExternalLink, Sparkles, Flame } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { AnimatedBuyButton } from '@/components/ui/animated-buy-button';

interface ProductCardProps {
  product: Product;
  onPreview: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPreview, onBuyNow }) => {
  const [imgError, setImgError] = useState(false);

  const fallbackImage = product.category === 'cars' 
    ? 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    : 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80';

  const displayImage = imgError || !product.thumbnailUrl ? fallbackImage : product.thumbnailUrl;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group relative border border-white/15 hover:border-purple-500/40 transition-all duration-300 shadow-xl">
      
      {/* Thumbnail Image Banner */}
      <Link 
        href={`/product/${product.id}`}
        className="relative aspect-[16/9] sm:aspect-[9/16] max-h-[360px] w-full overflow-hidden bg-black block cursor-pointer"
      >
        <img
          src={displayImage}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>🔥 Trending Vault</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/80 backdrop-blur-md text-zinc-300 border border-white/20 flex items-center gap-1">
            <Clapperboard className="w-3 h-3 text-white" strokeWidth={1.25} />
            {product.clipCount} Clips
          </span>
        </div>

        {/* AI Quality Audit Score Badge */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-950/90 backdrop-blur-md text-purple-200 border border-purple-500/40 flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>StockAI {product.rating || '5.0'}★</span>
          </span>
        </div>

        {/* Resolution Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/15">
            {product.resolution}
          </span>
        </div>
      </Link>

      {/* Card Content & Pricing */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-black/50 space-y-3">
        <div>
          {/* AI Quality Rating Explanation */}
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <div className="flex items-center gap-1.5 text-zinc-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-white">{product.rating || '5.0'}</span>
              <span className="text-[10px] text-zinc-400 font-mono">(AI Quality Audited)</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
              Most Purchased
            </span>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-sm text-white line-clamp-2 mb-2 group-hover:text-purple-300 transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-3">
            <span className="flex items-center gap-1">
              <Disc className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.25} />
              {product.fileSize}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.25} />
              ZIP Bundle
            </span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">Instant Download</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.id}`}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-zinc-300 border border-white/15 transition-all flex items-center gap-1 text-[10px] font-semibold"
              title="View Specifications & AI Score"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Specs</span>
            </Link>

            <AnimatedBuyButton
              price={product.price}
              label="Buy Bundle"
              onClick={() => onBuyNow(product)}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
