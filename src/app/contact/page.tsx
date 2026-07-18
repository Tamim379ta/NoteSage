"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineEnvelope,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
} from "react-icons/hi2";

const contactInfo = [
  {
    icon: <HiOutlineEnvelope size={20} />,
    label: "Email us",
    value: "support@notesage.app",
    sub: "We reply within 24 hours",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight size={20} />,
    label: "Live chat",
    value: "Available in the app",
    sub: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: <HiOutlineMapPin size={20} />,
    label: "Based in",
    value: "San Francisco, CA",
    sub: "Remote-first team",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to real API
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-neutral-bg">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <FadeUp>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
              Get in touch
            </span>
            <h1 className="text-4xl font-bold text-neutral-text mt-3 mb-3">
              We&apos;d love to hear from you
            </h1>
            <p className="text-neutral-text/60 text-sm max-w-md mx-auto">
              Have a question, found a bug, or just want to say hi? Drop us a message and we&apos;ll get back to you.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: contact info */}
          <div className="space-y-4">
            {contactInfo.map((info, i) => (
              <FadeUp key={info.label} delay={i * 0.1}>
                <div className="bg-white border border-neutral-border rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-text/40 mb-0.5">{info.label}</p>
                    <p className="text-sm font-semibold text-neutral-text">{info.value}</p>
                    <p className="text-xs text-neutral-text/40 mt-0.5">{info.sub}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Right: form */}
          <FadeUp delay={0.1} className="lg:col-span-2">
            <div className="bg-white border border-neutral-border rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-neutral-text mb-2">Message sent!</h3>
                  <p className="text-sm text-neutral-text/60">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-neutral-text mb-6">Send a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-neutral-text/60 block mb-1.5">
                          Full name
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-neutral-text/60 block mb-1.5">
                          Email address
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-text/60 block mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General question</option>
                        <option value="bug">Bug report</option>
                        <option value="feature">Feature request</option>
                        <option value="billing">Billing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-text/60 block mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us what's on your mind..."
                        className="w-full border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-primary hover:bg-primary-hover text-white px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </main>
  );
}