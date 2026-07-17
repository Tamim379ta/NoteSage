"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi2";
import { authClient, signIn } from "@/lib/auth-client";

const DEMO_EMAIL = "demo@notesage.app";
const DEMO_PASSWORD = "Demo12345";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    setLoading(true);
    const { error: authError } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message || "Invalid email or password.");
      return;
    }

    router.push("/");
  }

  async function handleGoogleLogin() {
    await signIn.social({ provider: "google", callbackURL: "/" });
  }

  function fillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  }

  return (
    <section className="min-h-screen bg-neutral-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-neutral-border bg-white shadow-sm lg:flex-row">
        <div className="flex flex-col justify-between bg-primary p-8 text-white sm:p-10 lg:w-[46%] lg:p-12">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <HiSparkles size={22} />
            NoteSage
          </Link>

          <div className="mt-10 lg:mt-0">
            <h2 className="mb-4 text-4xl font-bold leading-tight">
              Welcome<br />back.
            </h2>
            <p className="max-w-xs text-base text-white/70">
              Your notes are waiting. Pick up right where you left off and keep the streak going.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-xs text-white/50 lg:mt-0">
            <span>© 2025 NoteSage</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="w-full max-w-md">
            <h1 className="mb-1 text-2xl font-bold text-neutral-text">Log in to NoteSage</h1>
            <p className="mb-8 text-sm text-neutral-text/50">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Sign up free
              </Link>
            </p>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Form onSubmit={handleLogin} className="flex flex-col gap-4">
              <TextField isRequired name="email" type="email">
                <Label className="mb-1 block text-xs font-medium text-neutral-text/70">Email address</Label>
                <Input
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label className="mb-1 block text-xs font-medium text-neutral-text/70">Password</Label>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </Form>

            <button
              onClick={fillDemo}
              className="mt-3 w-full rounded-xl border border-dashed border-primary/40 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Try demo account
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-border" />
              <span className="text-xs text-neutral-text/40">OR</span>
              <div className="h-px flex-1 bg-neutral-border" />
            </div>

            <button
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-border bg-white py-3 text-sm font-medium text-neutral-text transition-colors hover:bg-neutral-bg"
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}