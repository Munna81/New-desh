import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header with Logo */}
      <header className="w-full max-w-6xl mx-auto p-4">
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo.png"
            alt="DeshiKinun Logo"
            width={380}
            height={150}
            priority
            className="h-32 w-auto object-contain"
          />
        </Link>
      </header>

      <main className="flex-1 pt-2 pb-20">{children}</main>

      {/* Bottom Navigation Bar with subtle white background */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white/90 border-t border-gray-100 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-6xl mx-auto flex justify-around items-center h-16 backdrop-blur-sm">
          <Link href="/" className="flex flex-col items-center text-black-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/support"
            className="flex flex-col items-center text-black-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs mt-1">Support</span>
          </Link>

          {/* Home Icon in the middle */}
          <Link href="/" className="flex flex-col items-center -mt-8">
            <div className="h-16 w-16 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          </Link>

          <Link
            href="/about"
            className="flex flex-col items-center text-black-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs mt-1">About</span>
          </Link>

          <div className="flex flex-col items-center text-black">
            <div className="h-7 flex items-center justify-center">
              <LanguageSwitcher />
            </div>
            <span className="text-xs mt-1 font-bold">Language</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
