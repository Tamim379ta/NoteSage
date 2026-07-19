"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useSession } from "@/lib/auth-client";


export default function AddMaterialPage() {

const router = useRouter();
const { data: session } = useSession();
const userId = (session?.user as any)?.id || "demo-user-id";

const [title, setTitle] = useState("");
const [file, setFile] = useState<File | null>(null);
const [dragging, setDragging] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [category, setCategory] = useState("General");

const categories = [
  "Biology", "History", "Computer Science", "Law",
  "Economics", "Chemistry", "Physics", "Mathematics", "General",
];

function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  const selected = e.target.files?.[0];
  if (selected) validateAndSetFile(selected);
}

function validateAndSetFile(selected: File) {
  const allowed = ["application/pdf", "text/plain"];
  if (!allowed.includes(selected.type)) {
    setError("Only PDF and TXT files are allowed.");
    return;
  }
  if (selected.size > 10 * 1024 * 1024) {
    setError("File must be under 10MB.");
    return;
  }
  setError("");
  setFile(selected);
  if (!title) setTitle(selected.name.replace(/\.[^/.]+$/, ""));
}

function handleDrop(e: React.DragEvent) {
  e.preventDefault();
  setDragging(false);
  const dropped = e.dataTransfer.files?.[0];
  if (dropped) validateAndSetFile(dropped);
}

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (!file) {
    setError("Please select a file.");
    return;
  }
  if (!title.trim()) {
    setError("Please enter a title.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/upload`,
      {
        method: "POST",
        headers: {
          "x-user-id": userId,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Upload failed. Try again.");
      return;
    }

    router.push(`/materials/manage?uploaded=${data.documentId}`);
  } catch (err) {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
}
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-neutral-bg">
        {/* Header */}
        <div className="bg-white border-b border-neutral-border">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <FadeUp>
              <h1 className="text-2xl font-bold text-neutral-text mb-1">
                Upload study material
              </h1>
              <p className="text-sm text-neutral-text/50">
                Upload a PDF or text file and NoteSage will generate a summary,
                flashcards, and a quiz automatically.
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* What happens next */}
            <FadeUp>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-4">
                <HiOutlineSparkles size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary mb-1">
                    What NoteSage will generate
                  </p>
                  <p className="text-xs text-neutral-text/60 leading-relaxed">
                    After upload, AI will read your material and generate a{" "}
                    <strong>summary</strong>, <strong>15 flashcards</strong>, and a{" "}
                    <strong>10-question quiz</strong> — usually ready in under 30
                    seconds.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Title */}
            <FadeUp delay={0.05}>
              <div className="bg-white border border-neutral-border rounded-2xl p-6">
                <label className="text-xs font-medium text-neutral-text/60 block mb-2">
                  Document title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cell Biology — Membrane Transport"
                  className="w-full border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="bg-white border border-neutral-border rounded-2xl p-6">
                <label className="text-xs font-medium text-neutral-text/60 block mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </FadeUp>

            {/* File upload */}
            <FadeUp delay={0.1}>
              <div className="bg-white border border-neutral-border rounded-2xl p-6">
                <label className="text-xs font-medium text-neutral-text/60 block mb-4">
                  Upload file
                </label>

                {file ? (
                  // File preview
                  <div className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <HiOutlineDocumentText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-text">
                          {file.name}
                        </p>
                        <p className="text-xs text-neutral-text/40">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-neutral-text/40 hover:text-red-500 transition-colors"
                    >
                      <HiOutlineXMark size={20} />
                    </button>
                  </div>
                ) : (
                  // Drop zone
                  <label
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-14 cursor-pointer transition-colors ${dragging
                      ? "border-primary bg-primary/5"
                      : "border-neutral-border hover:border-primary/50 hover:bg-neutral-bg"
                      }`}
                  >
                    <HiOutlineCloudArrowUp
                      size={36}
                      className={dragging ? "text-primary" : "text-neutral-text/30"}
                    />
                    <p className="text-sm font-medium text-neutral-text mt-3">
                      Drop your file here or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                    <p className="text-xs text-neutral-text/40 mt-1">
                      PDF or TXT — max 10MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </FadeUp>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit */}
            <FadeUp delay={0.15}>
              <button
                type="submit"
                disabled={loading || !file}
                className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white px-6 py-3.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles size={16} />
                    Upload & generate study material
                  </>
                )}
              </button>
            </FadeUp>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}