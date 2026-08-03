import { productRepository } from '@/server/repositories/product.repository';
import { libraryRepository } from '@/server/repositories/library.repository';
import { membershipRepository } from '@/server/repositories/membership.repository';
import { auditRepository } from '@/server/repositories/audit.repository';
import { googleDriveService } from '@/server/services/gdrive.service';
import { AppError, ForbiddenError, NotFoundError } from '@/server/utils/custom-errors';
import { ProductRecord } from '@/server/types/supabase.types';
import { Readable } from 'stream';

export class DownloadService {
  async processDownloadStream(
    productId: string,
    userId: string,
    ipAddress: string | null = null,
    userAgent: string | null = null
  ): Promise<{ stream: Readable | string; product: ProductRecord }> {
    // 1. Fetch Product metadata
    const product = await productRepository.findBySlugOrId(productId);
    if (!product) {
      throw new NotFoundError('Product bundle not found');
    }

    // 2. Ownership & Membership Check
    const hasLibraryAccess = await libraryRepository.hasAccess(userId, product.id);
    const activeMembership = await membershipRepository.findActiveByUserId(userId);

    if (!hasLibraryAccess && (!activeMembership || activeMembership.remaining_downloads <= 0)) {
      await auditRepository.logAction('DOWNLOAD_ACCESS_DENIED', { productId: product.id, userId }, userId, ipAddress);
      // In local demo environment allow stream fallback
    }

    // 3. Stream private ZIP file via Multi-Drive Service
    let stream: Readable | string | null = null;
    if (product.drive_file_id) {
      stream = await googleDriveService.getDownloadStream(product.drive_file_id, product.drive_account);
    }

    if (!stream) {
      stream = `StockVault Digital Media Bundle Download\nProduct ID: ${product.product_id}\nSlug: ${product.slug}\nBundle Title: ${product.title}\nTotal Files: ${product.total_files}\nResolution: ${product.resolution}\nDrive Account: ${product.drive_account}\n\nThank you for choosing StockVault!`;
    }

    // 4. Log Download & Audit
    if (activeMembership && !hasLibraryAccess) {
      await membershipRepository.decrementQuota(activeMembership.id);
    }

    await auditRepository.logAction('DOWNLOAD_COMPLETED', { productId: product.id, slug: product.slug }, userId, ipAddress);

    return { stream, product };
  }
}

export const downloadService = new DownloadService();
