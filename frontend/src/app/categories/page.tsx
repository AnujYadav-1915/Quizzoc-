"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Globe, BrainCircuit, Zap, Target, Map, Gamepad, Sword, Rocket, 
  Palette, Camera, Book, Music, Film, Utensils, HeartPulse, Cpu,
  Search, Play
} from "lucide-react";
import { cn } from "@/lib/utils";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://quizzoc.onrender.com";

// Map string icons from DB to Lucide React components
const iconMap: Record<string, any> = {
  Globe, BrainCircuit, Zap, Target, Map, Gamepad, Sword, Rocket,
  Palette, Camera, Book, Music, Film, Utensils, HeartPulse, Cpu
};

// Gradient color palettes for categories
const colorPalettes = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-indigo-400",
  "from-pink-500 to-rose-400",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-red-500 to-rose-600",
  "from-fuchsia-500 to-pink-600",
  "from-lime-400 to-emerald-500"
];

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/questions/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center relative overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-900/20 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore <span className="text-brand-400">Categories</span></h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose your battlefield. Dive into specific topics to test your knowledge or train for the global arena.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative group">
          <div className="absolute inset-0 bg-brand-500/20 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
          <div className="relative glass-panel rounded-2xl border border-white/10 flex items-center px-4 py-3 bg-black/40">
            <Search className="w-6 h-6 text-slate-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search for a topic..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-lg text-white w-full placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl h-48 animate-pulse border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category, idx) => {
              const Icon = iconMap[category.iconUrl] || Globe;
              const color = colorPalettes[idx % colorPalettes.length];

              return (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => router.push(`/solo?category=${category._id}`)}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="glass-panel p-6 rounded-3xl h-full flex flex-col border border-white/5 group-hover:border-brand-500/30 transition-all duration-300 group-hover:-translate-y-1 bg-black/20">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-lg", color)}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm text-slate-400 mb-6 flex-1">{category.description}</p>
                    
                    <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-white/5">
                      <span className="text-brand-400 font-medium">100+ Questions</span>
                      <motion.div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                        <Play className="w-3 h-3 text-white fill-current ml-0.5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        
        {!loading && filteredCategories.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Target className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl">No categories found matching "{searchQuery}"</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
