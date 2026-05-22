'use client';

import { ClerkProvider } from '@clerk/nextjs';

export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

  if (!clerkKey.startsWith('pk_')) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
