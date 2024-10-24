'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to pricing after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/pricing');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
          <svg
            className="h-6 w-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-medium text-gray-900">
          Payment cancelled
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Your payment was cancelled. You will be redirected to the pricing page shortly.
        </p>
      </div>
    </div>
  );
}
