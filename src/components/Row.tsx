import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BASE_URL, IMAGE_BASE_URL, Movie } from "../services/tmdb";
import { cn } from "../lib/utils";

interface RowProps {
  title: string;
  fetchUrl: string;
  isLarge?: boolean;
}

export default function Row({ title, fetchUrl, isLarge = false }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}${fetchUrl}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(`Error fetching row ${title}:`, error);
      }
    }
    fetchData();
  }, [fetchUrl, title]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-12 group/row">
      <div className="flex items-end justify-between px-10 lg:px-12 mb-6">
        <div>
          <h2 className="text-xs font-bold tracking-[0.4em] text-white/40 uppercase mb-2">
            {title}
          </h2>
          <div className="h-0.5 w-12 bg-camelot-gold transition-all group-hover/row:w-24"></div>
        </div>
        <div className="hidden lg:flex gap-4 opacity-0 group-hover/row:opacity-100 transition-opacity">
           <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-camelot-gold hover:text-camelot-gold transition-all"
           >
             <ChevronLeft className="w-5 h-5" />
           </button>
           <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-camelot-gold hover:text-camelot-gold transition-all"
           >
             <ChevronRight className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-10 lg:px-12 pb-8 hide-scrollbar scroll-smooth"
      >
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            className={cn(
              "relative flex-shrink-0 cursor-pointer transition-all duration-500 rounded border border-white/5 group overflow-hidden",
              isLarge ? "w-44 lg:w-56 aspect-[2/3]" : "w-64 lg:w-80 aspect-video"
            )}
          >
            <img
              src={`${IMAGE_BASE_URL}${isLarge ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title || movie.name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Geometric Info Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-1 truncate">{movie.title || movie.name}</p>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40 tracking-widest uppercase">
                        {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
                    </span>
                    <span className="text-[10px] text-white/40">&bull;</span>
                    <span className="text-[10px] text-white/40 tracking-widest uppercase">
                        Rating {movie.vote_average.toFixed(1)}
                    </span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
