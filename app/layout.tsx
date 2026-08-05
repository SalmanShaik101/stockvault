import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StockVault PRO',
  description: 'Instant download access to curated 4K reels, supercars, motivation, and stock video bundles with commercial license.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#fafafa] antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
