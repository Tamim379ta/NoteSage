"use client";

import { useState, useEffect, Suspense } from "react"; // Added Suspense
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FadeUp } from "@/components/animations/FadeUp";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useSession } from "@/lib/auth-client";

import {
  HiOutlineDocumentText,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineCloudArrowUp,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi2";

interface Document {
  _id: string;
  title: string;
  fileType: string;
  summary: string;
  status: "processing" | "ready" | "failed";
  createdAt: string;
}

const statusConfig = {
  ready: {
    label: "Ready",
    icon: <HiOutlineCheckCircle size={14} />,
    class: "bg-green-100 text-green-700",
  },
  processing: {
    label: "Processing",
    icon: <HiOutlineClock size={14} />,
    class: "bg-amber-100 text-amber-600",
  },
  failed: {
    label: "Failed",
    icon: <HiOutlineXCircle size={14} />,
    class: "bg-red-100 text-red-600",
  },
};

function DocumentSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-2xl p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-neutral-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral-200 rounded-full w-1/2" />
          <div className="h-3 bg-neutral-200 rounded-full w-1/3" />
        </div>
        <div className="h-6 w-20 bg-neutral-200 rounded-full" />
        <div className="h-8 w-16 bg-neutral-200 rounded-xl" />
        <div className="h-8 w-16 bg-neutral-200 rounded-xl" />
      </div>
    </div>
  );
}

// 1. Changed this to an internal component holding all the logic
function ManageMaterialsContent() {
  const { data: session } = useSession();
  console.log("USER ID:", (session?.user as any)?.id);
  const userId = (session?.user as any)?.id || "demo-user-id";

  const searchParams = useSearchParams();
  const justUploaded = searchParams.get("uploaded");

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(!!justUploaded);

  async function fetchDocuments() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents`,
        {
          headers: { "x-user-id": userId },
        }
      );
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userId) return;
    fetchDocuments();

    const interval = setInterval(() => {
      const hasProcessing = documents.some((d) => d.status === "processing");
      if (hasProcessing) fetchDocuments();
    }, 5000);

    return () => clearInterval(interval);
  }, [documents, userId]);

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(t);
    }
  }, [showSuccess]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this document? This will also remove its summary.")) return;

    setDeletingId(id);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/${id}`,
        {
          method: "DELETE",
          headers: { "x-user-id": userId },
        }
      );
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
          <FadeUp>
            <h1 className="text-2xl font-bold text-neutral-text mb-1">
              My materials
            </h1>
            <p className="text-sm text-neutral-text/50">
              Manage your uploaded documents and study sets.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/materials/add">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                <HiOutlineCloudArrowUp size={16} />
                Upload new
              </button>
            </Link>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Success banner */}
        {showSuccess && (
          <FadeUp>
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-2xl px-5 py-4 mb-6">
              <HiOutlineCheckCircle size={18} />
              <span>
                Document uploaded successfully — AI is generating your study
                material. This usually takes under 30 seconds.
              </span>
            </div>
          </FadeUp>
        )}

        {/* Documents list */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <DocumentSkeleton key={i} />
            ))}
          </div>
        ) : documents.length === 0 ? (
          <FadeUp>
            <div className="text-center py-24 bg-white border border-neutral-border rounded-2xl">
              <HiOutlineDocumentText
                size={40}
                className="text-neutral-text/20 mx-auto mb-4"
              />
              <p className="text-sm font-semibold text-neutral-text mb-1">
                No documents yet
              </p>
              <p className="text-xs text-neutral-text/40 mb-6">
                Upload your first set of notes to get started.
              </p>
              <Link href="/materials/add">
                <button
                  type="button"
                  className="rounded-xl bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors"
                >
                  Upload notes
                </button>
              </Link>
            </div>
          </FadeUp>
        ) : (
          <div className="space-y-3">
            {documents.map((doc, i) => (
              <FadeUp key={doc._id} delay={i * 0.05}>
                <div className="bg-white border border-neutral-border rounded-2xl p-5 flex items-center gap-4 hover:border-primary/30 transition-colors">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <HiOutlineDocumentText size={18} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-text truncate">
                      {doc.title}
                    </p>
                    <p className="text-xs text-neutral-text/40 mt-0.5">
                      {doc.fileType === "application/pdf" ? "PDF" : "TXT"} ·{" "}
                      {new Date(doc.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Status badge */}
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[doc.status].class
                      }`}
                  >
                    {statusConfig[doc.status].icon}
                    {statusConfig[doc.status].label}
                    {doc.status === "processing" && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping ml-1" />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {doc.status === "ready" && (
                      <Link href={`/explore/${doc._id}`}>
                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-xs font-medium text-primary border border-primary/30 rounded-xl px-3 py-2 hover:bg-primary hover:text-white transition-colors"
                        >
                          <HiOutlineEye size={14} />
                          View
                        </button>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(doc._id)}
                      disabled={deletingId === doc._id}
                      className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-xl px-3 py-2 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-40"
                    >
                      <HiOutlineTrash size={14} />
                      {deletingId === doc._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// 2. The main page component wrap, providing a fallback skeleton while useSearchParams populates
export default function ManageMaterialsPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-3">
          <DocumentSkeleton />
          <DocumentSkeleton />
        </div>
      }>
        <ManageMaterialsContent />
      </Suspense>
    </ProtectedRoute>
  );
}