'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Upload, Sparkles, CheckCircle2, FileArchive, Video, Image as ImageIcon, DollarSign, Layers } from 'lucide-react';

export default function AdminUploadPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('gym');
  const [price, setPrice] = useState(299);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [previewVideoUrl, setPreviewVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('price', price.toString());
      if (zipFile) formData.append('zipFile', zipFile);
      formData.append('thumbnailUrl', thumbnailUrl);
      formData.append('previewVideoUrl', previewVideoUrl);

      const res = await fetch('/api/admin/upload-bundle', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatusMessage(`✅ Published! Assigned Product ID: ${data.product.productId} (Drive File ID: ${data.product.driveFileId})`);
        setTitle('');
        setZipFile(null);
      } else {
        setStatusMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setStatusMessage('❌ Failed to upload bundle.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Automated Publishing Engine
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Upload className="w-7 h-7 text-indigo-400" />
            <span>Admin Bundle Upload Panel</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Upload ZIP bundles directly. The backend automatically uploads the file to the target Google Drive account, retrieves the <code className="text-indigo-300">driveFileId</code>, and creates the Firestore document.
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-8 space-y-6 border border-white/10">
          
          {/* Bundle Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Bundle Title</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1000+ HD Cars & Luxury Reels Pack"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Target Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="gym">Gym & Fitness</option>
                <option value="motivation">Motivation & Mindset</option>
                <option value="cars">Cars & Supercars</option>
                <option value="luxury">Luxury & Lifestyle</option>
                <option value="ai">AI & Futuristic</option>
                <option value="kids">Kids & Learning</option>
                <option value="comedy">Comedy & Memes</option>
                <option value="gaming">Gaming & Anime</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-indigo-400" />
                <span>Price (₹ INR)</span>
              </label>
              <input
                type="number"
                required
                min="99"
                max="9999"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* ZIP File Drop */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileArchive className="w-4 h-4 text-indigo-400" />
              <span>Select ZIP Bundle File</span>
            </label>
            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-colors bg-white/[0.02]">
              <input
                type="file"
                accept=".zip"
                onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                className="hidden"
                id="zip-upload"
              />
              <label htmlFor="zip-upload" className="cursor-pointer space-y-2 block">
                <FileArchive className="w-8 h-8 text-indigo-400 mx-auto" />
                <p className="text-xs font-semibold text-zinc-300">
                  {zipFile ? zipFile.name : 'Click to choose .ZIP file or drag and drop here'}
                </p>
                <p className="text-[10px] text-zinc-500">Supports files up to 5 GB. Streaming directly to Google Drive.</p>
              </label>
            </div>
          </div>

          {/* Cloudinary URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                <span>Thumbnail Image URL</span>
              </label>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/.../thumbnail.jpg"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Video className="w-4 h-4 text-indigo-400" />
                <span>Preview MP4 Video URL</span>
              </label>
              <input
                type="url"
                placeholder="https://res.cloudinary.com/.../preview.mp4"
                value={previewVideoUrl}
                onChange={(e) => setPreviewVideoUrl(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full glass-button-primary py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 disabled:opacity-50"
            >
              {isUploading ? (
                <span>Streaming & Publishing to Google Drive...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Bundle to Marketplace</span>
                </>
              )}
            </button>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div className="p-4 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-xs font-medium text-white">
              {statusMessage}
            </div>
          )}

        </form>

      </main>

      <Footer />
    </div>
  );
}
