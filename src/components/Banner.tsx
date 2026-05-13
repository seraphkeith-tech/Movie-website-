import { useState, useEffect } from "react";
import { Play, Info, Plus } from "lucide-react";
import { motion } from "motion/react";
import { BASE_URL, IMAGE_BASE_URL, Movie, requests } from "../services/tmdb";

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}${requests.fetchCamelotOriginals}`);
        const data = await response.json();
        const movies = data.results;
        setMovie(movies[Math.floor(Math.random() * movies.length)]);
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      }
    }
    fetchData();
  }, []);

  if (!movie) return <div className="h-[80vh] bg-camelot-black" />;

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="relative h-[85vh] lg:h-[90vh] bg-cover bg-top flex flex-col justify-end pb-24 lg:pb-32 px-10 lg:px-12"
      style={{
        backgroundImage: `url("${IMAGE_BASE_URL}${movie?.backdrop_path}")`,
      }}
    >
      {/* Overlay Gradients - Sharp & Structured */}
      <div className="absolute inset-0 bg-gradient-to-t from-camelot-black via-[#0B0B0C]/40 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-camelot-black/60 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-camelot-gold text-camelot-black text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-widest">PREMIUM</span>
          <span className="text-xs font-medium tracking-[0.3em] text-white/60 uppercase">Streaming Now</span>
        </div>

        <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 tracking-tighter uppercase leading-[0.85] text-white">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="text-white/60 text-lg lg:text-xl font-serif italic mb-10 max-w-xl leading-relaxed">
          {truncate(movie?.overview || "", 160)}
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-10 py-4 bg-white text-black font-bold text-sm tracking-widest flex items-center gap-3 hover:bg-camelot-gold transition-colors uppercase active:scale-95">
            <Play className="fill-current w-4 h-4" />
            Watch Now
          </button>
          <button className="px-10 py-4 border border-white/20 text-white font-bold text-sm tracking-widest hover:bg-white/10 transition-colors uppercase active:scale-95">
            + Add to List
          </button>
        </div>
      </motion.div>
    </header>
  );
}
