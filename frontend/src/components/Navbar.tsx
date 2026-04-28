"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, User, Menu } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();

  // Hide navbar in game screen to minimize distraction
  if (pathname?.startsWith("/game/")) return null;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto glass-panel border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Quizzoc</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Leaderboard</Link>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Categories</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/auth" 
            className="hidden md:flex px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors items-center gap-2 border border-white/5"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>
          <button className="md:hidden p-2 bg-white/5 rounded-lg border border-white/10">
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
