'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MOCK_ORDERS } from '@/lib/mockData';
import { Download, FolderDown, ShieldCheck, HardDrive, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function MyLibrary() {
  const handleDownload = (orderId: string, title: string) => {
    window.location.href = `/api/download/${orderId}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <FolderDown className="w-7 h-7 text-indigo-400" />
              <span>My Purchased Bundles</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Access your lifetime stock video downloads, Google Drive API streams, and commercial licenses.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Lifetime Access Guaranteed</span>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 hover:border-indigo-500/30"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img
                  src={order.thumbnailUrl}
                  alt={order.productTitle}
                  className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {order.productCategory}
                  </span>
                  <h3 className="font-bold text-base text-white">{order.productTitle}</h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      Purchased on {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
                      Downloaded {order.downloadCount} times
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Download Action */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                <div className="text-right hidden sm:block">
                  <span className="text-sm font-bold text-white block">{formatCurrency(order.amount)}</span>
                  <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" /> PAYMENT VERIFIED
                  </span>
                </div>

                <button
                  onClick={() => handleDownload(order.orderId, order.productTitle)}
                  className="glass-button-primary px-5 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-indigo-600/30 w-full sm:w-auto justify-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ZIP Bundle</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
