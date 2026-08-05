'use client';

import React from 'react';
import { Product } from '@/types';
import { Star, Clapperboard, Disc, CheckCircle, Maximize2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { AnimatedBuyButton } from '@/components/ui/animated-buy-button';

interface ProductCardProps {
  product: Product;
  onPreview: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPreview, onBuyNow }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group relative border border-white/15">
      {/* Thumbnail Image Banner */}
      <div 
        onClick={() => onPreview(product)}
        className="relative aspect-[16/9] sm:aspect-[9/16] max-h-[360px] w-full overflow-hidden bg-black cursor-pointer"
      >
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-sm text-white border border-white/20">
            {product.category}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/20 flex items-center gap-1">
            <Clapperboard className="w-3 h-3 text-white" strokeWidth={1.25} />
            {product.clipCount} Clips
          </span>
        </div>

        {/* Resolution Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/15">
            {product.resolution}
          </span>
        </div>
      </div>

      {/* Card Content & Pricing */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-black/50">
        <div>
          <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-white text-white" strokeWidth={1.25} />
            <span>{product.rating}</span>
            <span className="text-zinc-500">({product.downloads} downloads)</span>
          </div>

          <h3 className="font-bold text-sm text-white line-clamp-2 mb-2 group-hover:text-zinc-200 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-4">
            <span className="flex items-center gap-1">
              <Disc className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.25} />
              {product.fileSize}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={1.25} />
              ZIP Bundle
            </span>
          </div>
        </div>

        {/* Price & Action */}
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
            <button
              onClick={() => onPreview(product)}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 border border-white/15 transition-all"
              title="Quick Preview"
            >
              <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.25} />
            </button>

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
