'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Check, Loader2 } from 'lucide-react';

interface AnimatedBuyButtonProps {
  price?: number;
  label?: string;
  onClick: () => Promise<void> | void;
  className?: string;
}

export const AnimatedBuyButton: React.FC<AnimatedBuyButtonProps> = ({
  price,
  label = 'Buy Bundle',
  onClick,
  className = '',
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== 'idle') return;

    setStatus('loading');

    try {
      await onClick();
      // After order processing, trigger the green tick animation
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 3500);
    } catch (err) {
      setStatus('idle');
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Hidden Gooey SVG Filter */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>

      <motion.button
        onClick={handleClick}
        disabled={status !== 'idle'}
        animate={{
          width: status === 'loading' ? '140px' : status === 'success' ? '44px' : 'auto',
          borderRadius: status === 'success' ? '50px' : '14px',
          backgroundColor: status === 'success' ? '#10b981' : status === 'loading' ? '#18181b' : 'transparent',
          color: status === 'success' ? '#ffffff' : status === 'loading' ? '#71dfbe' : '#000000',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`blob-btn relative overflow-hidden px-4 py-2.5 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg border border-white/20 cursor-pointer ${
          status === 'idle' ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
        } ${className}`}
      >
        {/* Liquid Blobs Background */}
        {status === 'idle' && (
          <span className="blob-btn__inner pointer-events-none">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        )}

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-1.5 z-10"
            >
              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{label}</span>
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center justify-center gap-1 z-10"
            >
              <div className="flex items-center gap-1.5 text-[#71DFBE] font-mono text-[11px]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </div>
              {/* Progress bar animation */}
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-0.5">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.4, ease: 'linear' }}
                  className="h-full bg-[#71DFBE]"
                />
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center justify-center text-white z-10"
            >
              <Check className="w-5 h-5 stroke-[3]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
