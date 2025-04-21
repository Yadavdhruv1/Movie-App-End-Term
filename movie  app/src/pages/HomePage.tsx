import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api';
import { Movie } from '../types';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Film } from 'lucide-react';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
        setError(null);
      } catch (err) {
        setError('Failed to load trending movies. Please try again later.');
        console.error('Error fetching trending movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="container-custom pt-8">
      {/* Hero Section */}
      <div className="relative mt-8 mb-12 rounded-xl overflow-hidden">
        <div className="bg-gray-800 rounded-xl h-64 md:h-80 lg:h-96 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 flex items-center justify-start p-8 z-20">
            <div className="max-w-xl animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome to MiniFlix</h1>
              <p className="text-gray-300 mb-6 md:text-lg">
                Discover and explore the world of movies. Find your favorites and add them to your watchlist.
              </p>
              <a href="#trending" className="btn-primary">
                Explore Now
              </a>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="grid grid-cols-6 md:grid-cols-8 h-full opacity-50">
              {Array(16).fill(0).map((_, i) => (
                <div key={i} className="overflow-hidden">
                  <div className="h-full bg-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <section id="trending" className="mb-12 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <Film className="text-netflix-red" size={24} />
          <h2 className="text-2xl font-bold">Trending Movies</h2>
        </div>
        
        {loading ? (
          <LoadingSpinner size={40} className="py-12" />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary mt-4"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <MovieGrid movies={trendingMovies} />
        )}
      </section>
    </div>
  );
};

export default HomePage;