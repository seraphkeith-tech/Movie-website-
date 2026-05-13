import { useState, useEffect } from "react";
import { Search, Bell, User, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-10 h-20 flex items-center justify-between",
        isScrolled ? "bg-camelot-black/90 backdrop-blur-md geo-border-b" : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="flex items-center gap-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-camelot-gold text-2xl font-display font-black tracking-[0.2em] cursor-pointer hover:text-camelot-gold-bright transition-colors"
        >
          CAMELOT
        </motion.h1>

        <ul className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">
          <li className="text-white cursor-pointer hover:text-camelot-gold transition-colors">Cinema</li>
          <li className="cursor-pointer hover:text-camelot-gold transition-colors">Series</li>
          <li className="cursor-pointer hover:text-camelot-gold transition-colors">Originals</li>
          <li className="cursor-pointer hover:text-camelot-gold transition-colors">My List</li>
        </ul>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
          <Search className="w-4 h-4 text-white/60" />
        </div>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-camelot-gold to-camelot-gold-bright rounded-lg shadow-lg shadow-camelot-gold/20 flex items-center justify-center">
            <User className="w-6 h-6 text-camelot-black" />
          </div>
        </div>
      </div>
    </nav>
  );
}
