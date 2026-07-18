"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  HiOutlineDocumentText,
  HiOutlineRectangleStack,
  HiOutlineClipboardDocumentList,
  HiOutlineCloudArrowUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineFire,
} from "react-icons/hi2";
import { AiOutlineCompass } from "react-icons/ai";


// --- Static data (replace with API calls later) ---

const stats = [
  {
    label: "Documents uploaded",
    value: "12",
    icon: <HiOutlineDocumentText size={20} />,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Flashcards generated",
    value: "348",
    icon: <HiOutlineRectangleStack size={20} />,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Quizzes completed",
    value: "27",
    icon: <HiOutlineClipboardDocumentList size={20} />,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Day streak",
    value: "9",
    icon: <HiOutlineFire size={20} />,
    color: "bg-red-100 text-red-500",
  },
];

const weeklyActivity = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 60 },
  { day: "Fri", minutes: 35 },
  { day: "Sat", minutes: 50 },
  { day: "Sun", minutes: 20 },
];

const documentsOverTime = [
  { month: "Jan", documents: 1 },
  { month: "Feb", documents: 2 },
  { month: "Mar", documents: 3 },
  { month: "Apr", documents: 5 },
  { month: "May", documents: 8 },
  { month: "Jun", documents: 12 },
];

const quizScores = [
  { quiz: "Quiz 1", score: 60 },
  { quiz: "Quiz 2", score: 72 },
  { quiz: "Quiz 3", score: 65 },
  { quiz: "Quiz 4", score: 80 },
  { quiz: "Quiz 5", score: 78 },
  { quiz: "Quiz 6", score: 88 },
  { quiz: "Quiz 7", score: 92 },
];

const recentDocuments = [
  {
    id: "1",
    title: "Cell Biology — Membrane Transport",
    category: "Biology",
    flashcards: 24,
    quizQuestions: 15,
    createdAt: "2025-06-20",
    status: "ready",
  },
  {
    id: "3",
    title: "Data Structures — Trees & Graphs",
    category: "Computer Science",
    flashcards: 40,
    quizQuestions: 25,
    createdAt: "2025-06-18",
    status: "ready",
  },
  {
    id: "6",
    title: "Organic Chemistry — Reaction Mechanisms",
    category: "Chemistry",
    flashcards: 45,
    quizQuestions: 30,
    createdAt: "2025-06-17",
    status: "processing",
  },
];

const quickActions = [
  {
    label: "Upload notes",
    description: "Add a new document",
    icon: <HiOutlineCloudArrowUp size={20} />,
    href: "/materials/add",
    color: "bg-primary text-white hover:bg-primary-hover",
  },
  {
    label: "AI Chat",
    description: "Ask your AI tutor",
    icon: <HiOutlineChatBubbleLeftRight size={20} />,
    href: "/chat",
    color: "bg-white border border-neutral-border text-neutral-text hover:border-primary hover:text-primary",
  },
  {
    label: "Explore",
    description: "Browse study sets",
    icon: <AiOutlineCompass size={20} />,
    href: "/explore",
    color: "bg-white border border-neutral-border text-neutral-text hover:border-primary hover:text-primary",
  },
];

// --- Custom tooltip for charts ---
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-neutral-border rounded-xl px-3 py-2 text-xs shadow-sm">
      <p className="text-neutral-text/50 mb-1">{label}</p>
      <p className="font-semibold text-neutral-text">{payload[0].value}{payload[0].name === "minutes" ? " min" : payload[0].name === "score" ? "%" : ""}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <FadeUp>
            <p className="text-sm text-neutral-text/50 mb-1">Good morning 👋</p>
            <h1 className="text-2xl font-bold text-neutral-text">
              Welcome back, Tamim
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/materials/add">
              <button
                type="button"
                className="rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2"
              >
                <HiOutlineCloudArrowUp size={16} />
                Upload notes
              </button>
            </Link>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div className="bg-white border border-neutral-border rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-neutral-text">{stat.value}</p>
                <p className="text-xs text-neutral-text/50 mt-1">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly activity — bar chart */}
          <FadeUp delay={0.1} className="lg:col-span-1">
            <div className="bg-white border border-neutral-border rounded-2xl p-6 h-full">
              <h2 className="text-sm font-bold text-neutral-text mb-1">Weekly activity</h2>
              <p className="text-xs text-neutral-text/40 mb-6">Minutes studied per day</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyActivity} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="minutes" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </FadeUp>

          {/* Documents over time — line chart */}
          <FadeUp delay={0.15} className="lg:col-span-1">
            <div className="bg-white border border-neutral-border rounded-2xl p-6 h-full">
              <h2 className="text-sm font-bold text-neutral-text mb-1">Documents uploaded</h2>
              <p className="text-xs text-neutral-text/40 mb-6">Cumulative over time</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={documentsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="documents"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    dot={{ fill: "#4F46E5", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </FadeUp>

          {/* Quiz scores — line chart */}
          <FadeUp delay={0.2} className="lg:col-span-1">
            <div className="bg-white border border-neutral-border rounded-2xl p-6 h-full">
              <h2 className="text-sm font-bold text-neutral-text mb-1">Quiz scores</h2>
              <p className="text-xs text-neutral-text/40 mb-6">Score % over recent quizzes</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={quizScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="quiz" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    dot={{ fill: "#F59E0B", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </FadeUp>
        </div>

        {/* Bottom row — recent docs + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent documents */}
          <FadeUp delay={0.1} className="lg:col-span-2">
            <div className="bg-white border border-neutral-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-neutral-text">Recent documents</h2>
                <Link href="/materials/manage" className="text-xs text-primary hover:underline">
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-neutral-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                        <HiOutlineDocumentText size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-text line-clamp-1">
                          {doc.title}
                        </p>
                        <p className="text-xs text-neutral-text/40 mt-0.5">
                          {doc.category} · {doc.flashcards} cards · {doc.quizQuestions} questions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                      {doc.status === "processing" ? (
                        <span className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-medium">
                          Processing
                        </span>
                      ) : (
                        <Link href={`/explore/${doc.id}`}>
                          <button
                            type="button"
                            className="text-xs font-medium text-primary border border-primary/30 rounded-xl px-3 py-1.5 hover:bg-primary hover:text-white transition-colors"
                          >
                            Study
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Quick actions */}
          <FadeUp delay={0.15}>
            <div className="bg-white border border-neutral-border rounded-2xl p-6">
              <h2 className="text-sm font-bold text-neutral-text mb-6">Quick actions</h2>
              <div className="flex flex-col gap-3">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-colors cursor-pointer ${action.color}`}>
                      {action.icon}
                      <div>
                        <p className="text-sm font-semibold">{action.label}</p>
                        <p className="text-xs opacity-60">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </main>
  );
}