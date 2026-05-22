'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInClient() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <SignIn
        appearance={{ elements: { formButtonPrimary: 'bg-blue-600 hover:bg-blue-700', card: 'shadow-none border border-gray-100 rounded-2xl', headerTitle: 'text-gray-900', headerSubtitle: 'text-gray-500', socialButtonsBlockButton: 'border-gray-200 text-gray-600 hover:bg-gray-50' } }}
        signUpUrl="/sign-up"
        forceRedirectUrl="/user"
      />
    </div>
  );
}
