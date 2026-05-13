import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Row from "./components/Row";
import { requests } from "./services/tmdb";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen bg-camelot-black selection:bg-camelot-gold selection:text-black">
      <Navbar />
      
      <main>
        <Banner />
        
        <div className="-mt-16 lg:-mt-32 relative z-20 pb-20">
          <Row 
            title="CAMELOT ORIGINALS" 
            fetchUrl={requests.fetchCamelotOriginals} 
            isLarge 
          />
          <Row 
            title="Trending Now" 
            fetchUrl={requests.fetchTrending} 
          />
          <Row 
            title="Action & Adventure" 
            fetchUrl={requests.fetchAction} 
          />
          <Row 
            title="Sci-Fi & Fantasy" 
            fetchUrl={requests.fetchSciFi} 
          />
          <Row 
            title="Anime & Animation" 
            fetchUrl={requests.fetchAnimation} 
          />
          <Row 
            title="Chilling Horror" 
            fetchUrl={requests.fetchHorror} 
          />
          <Row 
            title="Romance & Drama" 
            fetchUrl={requests.fetchRomance} 
          />
          <Row 
            title="Documentaries" 
            fetchUrl={requests.fetchDocumentaries} 
          />
        </div>
      </main>

      <footer className="h-20 border-t border-white/10 flex items-center justify-between px-10 lg:px-12 bg-camelot-black mt-20">
        <div className="flex gap-8 text-[10px] font-bold tracking-widest text-white/30 uppercase">
           <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
           <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
           <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-camelot-gold uppercase">
          Camelot Streaming Services &copy; 2026
        </div>
      </footer>
    </div>
  );
}

