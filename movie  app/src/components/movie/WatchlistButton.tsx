import { BookmarkCheck, BookmarkPlus } from 'lucide-react';
import { Movie } from '../../types';
import { useWatchlist } from '../../context/WatchlistContext';

interface WatchlistButtonProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const WatchlistButton = ({ movie, size = 'md', showText = false }: WatchlistButtonProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.imdbID);
  
  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };
  
  // Size configuration
  const buttonSizeClasses = {
    sm: 'p-1 rounded-full',
    md: 'p-2 rounded-full',
    lg: 'p-2 rounded-md',
  }[size];
  
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 22,
  }[size];
  
  return (
    <button
      onClick={handleToggleWatchlist}
      className={`${buttonSizeClasses} ${
        inWatchlist 
          ? 'bg-netflix-red text-white' 
          : 'bg-black bg-opacity-70 hover:bg-netflix-red text-white'
      } transition-colors duration-300 ${showText ? 'flex items-center gap-2' : ''}`}
      title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {inWatchlist ? (
        <>
          <BookmarkCheck size={iconSize} />
          {showText && <span>Remove</span>}
        </>
      ) : (
        <>
          <BookmarkPlus size={iconSize} />
          {showText && <span>Add to Watchlist</span>}
        </>
      )}
    </button>
  );
};

export default WatchlistButton;