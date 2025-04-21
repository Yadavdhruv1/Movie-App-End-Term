import { useWatchlist } from '../context/WatchlistContext';
import MovieGrid from '../components/movie/MovieGrid';
import { Link } from 'react-router-dom';
import { BookmarkCheck, Trash2 } from 'lucide-react';

const WatchlistPage = () => {
  const { watchlist, clearWatchlist } = useWatchlist();
  
  return (
    <div className="container-custom pt-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <BookmarkCheck className="text-netflix-red" size={24} />
          <h1 className="text-2xl font-bold">My Watchlist</h1>
          <span className="bg-gray-800 px-2 py-1 rounded-full text-sm">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}
          </span>
        </div>
        
        {watchlist.length > 0 && (
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to clear your entire watchlist?')) {
                clearWatchlist();
              }
            }}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <Trash2 size={16} />
            Clear Watchlist
          </button>
        )}
      </div>
      
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="text-center py-16 flex flex-col items-center">
          <BookmarkCheck className="text-gray-700 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-300 mb-3">Your watchlist is empty</h3>
          <p className="text-gray-400 mb-6">Start adding movies to keep track of what you want to watch.</p>
          <Link to="/" className="btn-primary">
            Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;