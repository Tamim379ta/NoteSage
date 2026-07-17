import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export function Footer() {
  return (
    <footer className="w-full bg-neutral-text text-neutral-bg mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">NoteSage</h3>
          <p className="text-sm text-neutral-border">
            Turn your notes into summaries, quizzes, and flashcards with AI.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/explore" className="hover:text-primary">Explore</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            <li><Link href="/chat" className="hover:text-primary">AI Chat</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Get in touch</h4>
          <p className="text-sm flex items-center gap-2 mb-4">
            <HiOutlineMail size={16} /> support@notesage.app
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-border/20 text-center text-xs py-4 text-neutral-border">
        © {new Date().getFullYear()} NoteSage. All rights reserved.
      </div>
    </footer>
  );
}