import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '../types';
import toast from 'react-hot-toast';

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    // Initialize from localStorage if available
    const savedWatchlist = localStorage.getItem('miniflix-watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('miniflix-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    if (!isInWatchlist(movie.imdbID)) {
      setWatchlist((prev) => [...prev, movie]);
      toast.success(`Added "${movie.Title}" to your watchlist!`);
    } else {
      toast.error(`"${movie.Title}" is already in your watchlist`);
    }
  };

  const removeFromWatchlist = (id: string) => {
    const movie = watchlist.find(item => item.imdbID === id);
    setWatchlist((prev) => prev.filter((item) => item.imdbID !== id));
    if (movie) {
      toast.success(`Removed "${movie.Title}" from your watchlist`);
    }
  };

  const isInWatchlist = (id: string): boolean => {
    return watchlist.some((movie) => movie.imdbID === id);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    toast.success('Watchlist cleared');
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, clearWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}