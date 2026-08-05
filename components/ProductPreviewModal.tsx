'use client';

import React from 'react';
import { Product } from '@/types';
import { X, Play, Star, Clapperboard, Disc, CheckCircle, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { AnimatedBuyButton } from '@/components/ui/animated-buy-button';

interface ProductPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product) => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  product,
  onClose,
  onBuyNow,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40">
          <div>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
              {product.category}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1 line-clamp-1">
              {product.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Video Player & Info Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Main 4K Video Preview */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/15 shadow-xl">
            <video
              src={product.previewVideoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details & Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col">
              <span className="text-zinc-500 mb-0.5">Clip Count</span>
              <span className="font-bold text-white flex items-center gap-1">
                <Clapperboard className="w-3.5 h-3.5 text-white" />
                {product.clipCount} Reels
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col">
              <span className="text-zinc-500 mb-0.5">Bundle Size</span>
              <span className="font-bold text-white flex items-center gap-1">
                <Disc className="w-3.5 h-3.5 text-white" />
                {product.fileSize}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col">
              <span className="text-zinc-500 mb-0.5">Resolution</span>
              <span className="font-bold text-white">{product.resolution}</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col">
              <span className="text-zinc-500 mb-0.5">Aspect Ratio</span>
              <span className="font-bold text-white">{product.aspectRatio}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Vault Contents
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-white" strokeWidth={1.5} />
              100% Watermark Free
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-white" strokeWidth={1.5} />
              Commercial Editing License Included
            </span>
          </div>

        </div>

        {/* Modal Footer / Checkout Action */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-400">One-time payment • Lifetime access</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors flex-1 sm:flex-none"
            >
              Cancel
            </button>
            <AnimatedBuyButton
              price={product.price}
              label="Buy & Download Now"
              onClick={() => onBuyNow(product)}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
