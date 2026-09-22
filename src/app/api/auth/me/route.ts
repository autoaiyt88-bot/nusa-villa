import { NextResponse } from 'next/server';
import { getCurrentUserDetails } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUserDetails();
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user });
}
