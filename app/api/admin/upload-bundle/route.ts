import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const price = Number(formData.get('price'));
    const zipFile = formData.get('zipFile') as File | null;
    const thumbnailUrl = formData.get('thumbnailUrl') as string;
    const previewVideoUrl = formData.get('previewVideoUrl') as string;

    if (!title || !category || !price) {
      return NextResponse.json({ error: 'Missing required bundle metadata' }, { status: 400 });
    }

    // Auto-generate Product ID
    const categoryCode = category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const productId = `${categoryCode}${randomNum}`;

    // Simulated Google Drive File ID generated automatically upon stream upload
    const generatedDriveFileId = `1aB9_${category}_${productId}_${Date.now()}`;

    const newProduct = {
      id: `prod_${productId.toLowerCase()}`,
      productId,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      price,
      originalPrice: price * 3,
      driveFileId: generatedDriveFileId,
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      previewVideoUrl: previewVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      clipCount: 500,
      fileSize: zipFile ? `${(zipFile.size / (1024 * 1024 * 1024)).toFixed(1)} GB` : '3.5 GB',
      resolution: '1080x1920',
      aspectRatio: '9:16',
      format: 'MP4',
      tags: [category, 'reels', 'hd', 'stock'],
      downloads: 0,
      rating: 5.0,
      active: true,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Bundle uploaded and published successfully!',
      product: newProduct,
    });
  } catch (error: any) {
    console.error('Admin Upload Error:', error);
    return NextResponse.json({ error: 'Failed to process bundle upload' }, { status: 500 });
  }
}
