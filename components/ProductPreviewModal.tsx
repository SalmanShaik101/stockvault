'use client';

import React from 'react';
import { Product } from '@/types';
import { X, Download, CheckCircle2, Film, HardDrive, Tag, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel border border-white/20 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
              {product.category}
            </span>
            <span className="text-xs text-zinc-400 font-mono">ID: {product.productId}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Preview Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            src={product.previewVideoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{product.title}</h2>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Film className="w-4 h-4 text-white" />
                {product.clipCount} Video Clips
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-4 h-4 text-white" />
                Size: {product.fileSize}
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-white" />
                Format: {product.format} ({product.resolution})
              </span>
            </div>
          </div>

          {/* Included Assets Grid */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Inside This ZIP Bundle:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>{product.clipCount}+ High-Bitrate Unwatermarked MP4 Videos</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Commercial & Personal Use Rights Included</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Organized by subfolders (clips/, license.txt)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Instant Google Drive API Private Streaming</span>
              </li>
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <Tag className="w-3.5 h-3.5 text-zinc-500 mr-1" />
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-zinc-900 text-zinc-400 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer / Checkout CTA */}
        <div className="p-6 border-t border-white/10 bg-black/90 flex flex-col sm:flex-row items-center justify-between gap-4">
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
            <button
              onClick={() => {
                onClose();
                onBuyNow(product);
              }}
              className="glass-button-primary px-6 py-3 rounded-xl text-xs font-bold text-black flex items-center justify-center gap-2 flex-1 sm:flex-none shadow-lg shadow-white/20"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Buy & Download Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
