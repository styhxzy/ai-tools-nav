import { NextRequest, NextResponse } from 'next/server';
import { unifiedSearch } from '@/lib/search';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const results = unifiedSearch(q);
  return NextResponse.json(results);
}
