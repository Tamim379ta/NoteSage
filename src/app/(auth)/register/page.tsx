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
  Description,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { HiSparkles } from "react-icons/hi2";
import { signIn, authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (authError) {
      setError(authError.message || "Something went wrong. Try again.");
      return;
    }

    router.push("/");
  }

  async function handleGoogleSignup() {
    await signIn.social({ provider: "google", callbackURL: "/" });
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
              Your notes,<br />supercharged.
            </h2>
            <p className="max-w-xs text-base text-white/70">
              Upload once. Get summaries, flashcards, and quizzes — all powered by AI and built around how you actually study.
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
            <h1 className="mb-1 text-2xl font-bold text-neutral-text">Create your account</h1>
            <p className="mb-8 text-sm text-neutral-text/50">
              Start turning notes into study material — free forever.
            </p>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Form onSubmit={handleRegister} className="flex flex-col gap-4">
              <TextField isRequired name="name">
                <Label className="mb-1 block text-xs font-medium text-neutral-text/70">Full name</Label>
                <Input
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label className="mb-1 block text-xs font-medium text-neutral-text/70">Email address</Label>
                <Input
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <TextField isRequired name="password" type="password" minLength={8}>
                <Label className="mb-1 block text-xs font-medium text-neutral-text/70">Password</Label>
                <Input
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <Description className="mt-1 text-xs text-neutral-text/40">
                  At least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <TextField isRequired name="confirmPassword" type="password">
                <Label className="mb-1 block text-xs font-medium text-neutral-text/70">Confirm password</Label>
                <Input
                  placeholder="Repeat your password"
                  className="w-full rounded-xl border border-neutral-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <FieldError className="mt-1 text-xs text-red-500" />
              </TextField>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </Form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-border" />
              <span className="text-xs text-neutral-text/40">OR</span>
              <div className="h-px flex-1 bg-neutral-border" />
            </div>

            <button
              onClick={handleGoogleSignup}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-border bg-white py-3 text-sm font-medium text-neutral-text transition-colors hover:bg-neutral-bg"
            >
              <FcGoogle size={18} />
              Sign up with Google
            </button>

            <p className="mt-6 text-center text-sm text-neutral-text/50">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}