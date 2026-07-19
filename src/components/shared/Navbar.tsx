"use client";

import { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

export function Navbar() {
  const { data: sessionData, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const session = sessionData as {
    user?: {
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const loading = isPending;
  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || session?.user?.email || "there";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-neutral-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" >
            <Image
              src={'/assets/logo.png'}
              alt="logo"
              width={150}
              height={50}
            />

          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/explore" className="text-sm font-medium hover:text-primary">
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>

            {isLoggedIn && (
  <>
    <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
      Dashboard
    </Link>
    <Link href="/chat" className="text-sm font-medium hover:text-primary">
      AI Chat
    </Link>
    <Link href="/materials/manage" className="text-sm font-medium hover:text-primary">
      My Materials
    </Link>
  </>
)}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="hidden text-sm font-medium text-neutral-700 sm:block">
                  Hi, {userName}
                </span>
                <button
                  type="button"
                  className="hidden rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white sm:block"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {!loading && (
                  <div className="hidden items-center gap-3 sm:flex">
                    <Link href="/login">
                      <button
                        type="button"
                        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary hover:text-primary"
                      >
                        Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button
                        type="button"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                      >
                        Get Started
                      </button>
                    </Link>
                  </div>
                )}
              </>
            )}

            <button
              type="button"
              className="rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100 md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              <RxHamburgerMenu size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-3 border-t border-neutral-200 pt-4 md:hidden">
            <Link href="/explore" className="text-sm font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Explore
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            {isLoggedIn && (
  <>
    <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
      Dashboard
    </Link>
    <Link href="/chat" className="text-sm font-medium hover:text-primary">
      AI Chat
    </Link>
    <Link href="/materials/manage" className="text-sm font-medium hover:text-primary">
      My Materials
    </Link>
  </>
)}

            {isLoggedIn ? (
              <button
                type="button"
                className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                onClick={() => {
                  setMobileMenuOpen(false);
                  void handleSignOut();
                }}
              >
                Logout
              </button>
            ) : (
              !loading && (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      type="button"
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary hover:text-primary"
                    >
                      Login
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      type="button"
                      className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Get Started
                    </button>
                  </Link>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}