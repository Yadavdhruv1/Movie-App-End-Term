import { Movie } from '../../types';
import MovieCard from './MovieCard';
import { Film } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
}

const MovieGrid = ({ movies, loading = false, error = null }: MovieGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {[...Array(10)].map((_, index) => (
          <div 
            key={`skeleton-${index}`} 
            className="movie-card animate-pulse bg-gray-800"
          >
            <div className="movie-card-img bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">{error}</p>
        <p className="text-gray-400">Please try a different search or check back later.</p>
      </div>
    );
  }
  
  if (movies.length === 0) {
    return (
      <div className="text-center py-16 flex flex-col items-center">
        <Film className="text-gray-700 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No movies found</h3>
        <p className="text-gray-400">Try adjusting your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;