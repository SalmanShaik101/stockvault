import { NextRequest } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { libraryRepository } from '@/server/repositories/library.repository';
import { ApiResponse } from '@/server/utils/api-response';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const user = await authService.verifyToken(authHeader);

    const library = await libraryRepository.getUserLibrary(user.id);
    return ApiResponse.success(library, 'User library retrieved', 200, library.length);
  } catch (error: any) {
    return ApiResponse.error(error.message || 'Failed to fetch library', error.statusCode || 500);
  }
}
