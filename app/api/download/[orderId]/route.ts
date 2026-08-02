import { NextRequest, NextResponse } from 'next/server';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/mockData';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // 1. Check order record
    const order = MOCK_ORDERS.find((o) => o.orderId === orderId || o.id === orderId);
    
    // Default to first product if demo test order
    const product = MOCK_PRODUCTS.find((p) => p.productId === order?.productId) || MOCK_PRODUCTS[0];

    if (!product) {
      return NextResponse.json({ error: 'Product bundle unavailable' }, { status: 404 });
    }

    // 2. If Google Drive Service Account key is provided, stream via googleapis SDK
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY && product.driveFileId) {
      try {
        const { google } = require('googleapis');
        const auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });
        const driveResponse = await drive.files.get(
          { fileId: product.driveFileId, alt: 'media' },
          { responseType: 'stream' }
        );

        const headers = new Headers();
        headers.set('Content-Type', 'application/zip');
        headers.set(
          'Content-Disposition',
          `attachment; filename="${product.slug || 'stock-bundle'}.zip"`
        );

        return new NextResponse(driveResponse.data as any, { headers });
      } catch (gErr: any) {
        console.error('Google Drive Stream Error:', gErr);
      }
    }

    // 3. Demo Mode Fallback Stream
    const demoZipContent = `StockVault Digital Media Bundle Download
Product ID: ${product.productId}
Bundle Title: ${product.title}
File Count: ${product.clipCount} Clips
Resolution: ${product.resolution}
Google Drive File ID (Stored in DB): ${product.driveFileId}

Thank you for your purchase! To link live downloads, configure GOOGLE_SERVICE_ACCOUNT_KEY in .env.local`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set(
      'Content-Disposition',
      `attachment; filename="${product.slug || 'stock-bundle'}-DEMO.zip"`
    );

    return new NextResponse(demoZipContent, { headers });
  } catch (error: any) {
    console.error('Download API Error:', error);
    return NextResponse.json({ error: 'Failed to initiate download' }, { status: 500 });
  }
}
