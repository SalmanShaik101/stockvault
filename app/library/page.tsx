'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Download, FolderDown, ShieldCheck, HardDrive, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  productCategory: string;
  thumbnailUrl: string;
  amount: number;
  createdAt: string;
  downloadCount: number;
}

export default function MyLibrary() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('stockvault_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      } catch (e) {
        setUser(null);
      }
    }

    async function fetchUserOrders() {
      setLoading(true);
      try {
        const res = await fetch('/api/orders');
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setOrders(json.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, []);

  const handleDownload = (orderId: string, title: string) => {
    window.location.href = `/api/download/${orderId}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050507]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <FolderDown className="w-7 h-7 text-white" />
              <span>My Purchased Bundles</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              {user ? `Logged in as ${user.email} • Lifetime download access` : 'Access your purchased 4K stock video vaults'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Lifetime Access Guaranteed</span>
          </div>
        </div>

        {/* User Content */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={order.thumbnailUrl || 'https://raw.githubusercontent.com/SalmanShaik101/stockvault/main/public/cars-bundle-blue.png'}
                    alt={order.productTitle}
                    className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-white border border-white/20">
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
                        Downloaded {order.downloadCount || 0} times
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Action */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-sm font-bold text-white block">{formatCurrency(order.amount)}</span>
                    <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> PAYMENT VERIFIED
                    </span>
                  </div>

                  <button
                    onClick={() => handleDownload(order.orderId, order.productTitle)}
                    className="glass-button-primary px-5 py-3 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
                  >
                    <Download className="w-4 h-4 text-black" />
                    <span>Download ZIP Bundle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center space-y-6 max-w-xl mx-auto border border-white/15 my-12">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto border border-white/20 shadow-xl">
              <FolderDown className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">No Purchased Bundles Yet</h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                {user 
                  ? `Your account (${user.email}) does not have any active bundle purchases yet. Explore our stock video vaults to get instant download access!`
                  : 'You are currently browsing as a guest. Sign in or purchase a 4K stock video bundle to unlock your lifetime library downloads.'
                }
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#catalog"
                className="glass-button-primary px-6 py-3 rounded-xl text-xs font-bold text-black flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Explore Stock Vaults</span>
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
