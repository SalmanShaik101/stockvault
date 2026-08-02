import { NextResponse } from 'next/server';

export interface ApiResponseData<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
}

export class ApiResponse {
  static success<T>(data: T, message?: string, statusCode: number = 200, count?: number) {
    const payload: ApiResponseData<T> = {
      success: true,
      data,
    };
    if (message) payload.message = message;
    if (count !== undefined) payload.count = count;
    return NextResponse.json(payload, { status: statusCode });
  }

  static error(message: string, statusCode: number = 500) {
    const payload: ApiResponseData = {
      success: false,
      error: message,
    };
    return NextResponse.json(payload, { status: statusCode });
  }
}
