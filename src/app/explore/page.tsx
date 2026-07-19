"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const ITEMS_PER_PAGE = 8;

const categories = [
  "All",
  "Biology",
  "History",
  "Computer Science",
  "Law",
  "Economics",
  "Chemistry",
  "Physics",
  "Mathematics",
  "General",
];

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
];

function StudySetSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-2xl p-5 animate-pulse">
      <div className="h-4 bg-neutral-200 rounded-full w-1/3 mb-4" />
      <div className="h-5 bg-neutral-200 rounded-full w-3/4 mb-3" />
      <div className="h-4 bg-neutral-200 rounded-full w-full mb-2" />
      <div className="h-4 bg-neutral-200 rounded-full w-5/6 mb-6" />
      <div className="flex items-center justify-between mt-6">
        <div className="w-8 h-8 rounded-full bg-neutral-200" />
        <div className="h-8 bg-neutral-200 rounded-xl w-24" />
      </div>
    </div>
  );
}

function getInitials(title: string) {
  return title
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function ExplorePage() {
  const [studySets, setStudySets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPublicDocs() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/public`
        );
        const data = await res.json();
        setStudySets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setStudySets([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicDocs();
  }, []);

  const filtered = useMemo(() => {
    let result = [...studySets];

    if (search.trim()) {
      result = result.filter(
        (s) =>
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.summary?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((s) => s.category === category);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return result;
  }, [studySets, search, category, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function handleFilterChange(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <FadeUp>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-text mb-2">
              Explore study sets
            </h1>
            <p className="text-neutral-text/60 text-sm">
              Browse AI-generated study material uploaded by students like you.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + Sort */}
        <FadeUp className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-text/40"
            />
            <input
              type="text"
              placeholder="Search by title or topic..."
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border border-neutral-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineAdjustmentsHorizontal
              size={16}
              className="text-neutral-text/40"
            />
            <select
              value={sort}
              onChange={(e) => handleFilterChange(setSort, e.target.value)}
              className="text-sm border border-neutral-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </FadeUp>

        {/* Category filters */}
        <FadeUp delay={0.05} className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleFilterChange(setCategory, c)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                category === c
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-neutral-text/60 border-neutral-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </FadeUp>

        {/* Results count */}
        <p className="text-xs text-neutral-text/40 mb-6">
          {loading
            ? "Loading..."
            : `${filtered.length} study set${filtered.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <StudySetSkeleton key={i} />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-24">
            <HiOutlineDocumentText
              size={40}
              className="text-neutral-text/20 mx-auto mb-4"
            />
            <p className="text-neutral-text/40 text-sm">
              No study sets match your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPage(1);
              }}
              className="mt-4 text-primary text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginated.map((set, i) => (
          <FadeUp key={set._id} delay={i * 0.05}>
  <div className="h-full flex flex-col bg-white border border-neutral-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all group">
    
    {/* Top accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/40" />

    <div className="p-5 flex flex-col flex-1">
      {/* Category + Date */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {set.category || "General"}
        </span>
        <span className="text-[11px] text-neutral-text/40">
          {new Date(set.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-neutral-text mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
        {set.title}
      </h3>

      {/* Summary preview */}
      <p className="text-xs text-neutral-text/50 leading-relaxed line-clamp-3 flex-1">
        {set.summary
          ? set.summary.replace(/^[-•*]\s*/gm, "").slice(0, 120) + "..."
          : "AI-generated study material"}
      </p>

      {/* Divider */}
      <div className="h-px bg-neutral-border my-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
            {getInitials(set.title)}
          </div>
          <span className="text-[11px] text-neutral-text/40 font-medium">
            AI Generated
          </span>
        </div>

        <Link href={`/explore/${set._id}`}>
          <button
            type="button"
            className="text-xs font-semibold text-white bg-primary rounded-xl px-4 py-1.5 hover:bg-primary-hover transition-colors"
          >
            View details →
          </button>
        </Link>
      </div>
    </div>
  </div>
</FadeUp>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeUp className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm border border-neutral-border rounded-xl bg-white text-neutral-text/60 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 text-sm rounded-xl border transition-colors ${
                  page === i + 1
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-neutral-text/60 border-neutral-border hover:border-primary hover:text-primary"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm border border-neutral-border rounded-xl bg-white text-neutral-text/60 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </FadeUp>
        )}
      </div>
    </main>
  );
}