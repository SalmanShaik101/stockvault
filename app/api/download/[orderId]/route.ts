import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { downloadService } from '@/server/services/download.service';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);

    const ipAddress = req.headers.get('x-forwarded-for') || null;
    const userAgent = req.headers.get('user-agent') || null;

    const { stream, product } = await downloadService.processDownloadStream(
      orderId,
      user.id,
      ipAddress,
      userAgent
    );

    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set(
      'Content-Disposition',
      `attachment; filename="${product.slug || 'stock-bundle'}.zip"`
    );

    if (typeof stream === 'string') {
      return new NextResponse(stream, { headers });
    }

    return new NextResponse(stream as any, { headers });
  } catch (error: any) {
    console.error('Download Stream Route Error:', error);
    return NextResponse.json({ error: error.message || 'Download failed' }, { status: error.statusCode || 500 });
  }
}
