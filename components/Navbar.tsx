'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, FolderArchive, Hexagon, Command, Gem, LogIn, LogOut, X, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('stockvault_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.email) {
          setIsLoggedIn(true);
          setUserEmail(parsed.email);
        }
      } catch (e) {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleGoogleLogin = () => {
    const demoGoogleEmail = inputEmail && inputEmail.includes('@') ? inputEmail : 'samsupport0@gmail.com';
    const userData = { email: demoGoogleEmail, provider: 'google', loggedInAt: new Date().toISOString() };
    localStorage.setItem('stockvault_user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserEmail(demoGoogleEmail);
    setIsAuthOpen(false);
    setAuthError('');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail || !inputEmail.includes('@')) {
      setAuthError('Please enter a valid Google Mail address');
      return;
    }
    const userData = { email: inputEmail, provider: 'email', loggedInAt: new Date().toISOString() };
    localStorage.setItem('stockvault_user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserEmail(inputEmail);
    setIsAuthOpen(false);
    setAuthError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('stockvault_user');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/15 bg-black/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-lg shadow-white/10 group-hover:scale-105 transition-transform duration-300">
              <Hexagon className="w-5 h-5 text-black" strokeWidth={1.5} />
            </div>
            <div className="flex items-center">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                StockVault <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/20 font-mono tracking-widest uppercase">PRO</span>
              </span>
            </div>
          </Link>

          {/* Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" strokeWidth={1.25} />
            <input
              type="text"
              placeholder="Search 10,000+ HD Reels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/15 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 transition-all font-sans"
            />
            <kbd className="hidden lg:inline-flex items-center gap-1 absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-400 bg-zinc-900/90 px-1.5 py-0.5 rounded border border-white/10">
              <Command className="w-2.5 h-2.5" strokeWidth={1.25} /> K
            </kbd>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/library"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/15 transition-all"
            >
              <FolderArchive className="w-4 h-4 text-white" strokeWidth={1.25} />
              <span>My Library</span>
            </Link>

            <Link
              href="/pass"
              className="glass-button-primary px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5"
            >
              <Gem className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
              <span>Get Pass</span>
            </Link>

            {/* Auth Login Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <span className="text-[11px] text-zinc-300 font-mono hidden sm:inline-block max-w-[140px] truncate">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Auth Login Modal (No Password Required) */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md glass-panel border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                  <Hexagon className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Sign In to StockVault</h3>
                  <p className="text-[11px] text-zinc-400">Zero password needed — 1-click Google account access</p>
                </div>
              </div>
              <button
                onClick={() => setIsAuthOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/15"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  {authError}
                </div>
              )}

              {/* 1-Click Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200 py-3 rounded-xl font-bold text-xs shadow-xl transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google Account</span>
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-white/10 w-full"></div>
                <span className="bg-black/90 px-3 text-[10px] text-zinc-500 uppercase tracking-widest absolute">or email</span>
              </div>

              {/* Direct Email Form (No Password Field!) */}
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-zinc-400 font-semibold">Google / Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="samsupport0@gmail.com"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full glass-button-primary py-3 rounded-xl text-xs font-bold text-black hover:scale-[1.02] transition-all shadow-lg"
                >
                  Restore Account & Library
                </button>
              </form>
            </div>

            <div className="text-center text-[10px] text-zinc-500 border-t border-white/10 pt-4">
              Your account data & purchases remain live forever based on your email • StockVault PRO
            </div>

          </div>
        </div>
      )}
    </>
  );
};
