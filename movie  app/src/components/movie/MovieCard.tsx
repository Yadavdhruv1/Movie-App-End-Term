import { Link } from 'react-router-dom';
import { Movie } from '../../types';
import WatchlistButton from './WatchlistButton';
import { Film } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className = '' }: MovieCardProps) => {
  const { imdbID, Title, Year, Poster } = movie;
  
  // Handle missing or N/A poster
  const hasPoster = Poster && Poster !== 'N/A';
  
  return (
    <div className={`movie-card ${className}`}>
      <Link to={`/movie/${imdbID}`} className="block relative">
        {hasPoster ? (
          <img 
            src={Poster} 
            alt={Title} 
            className="movie-card-img"
            loading="lazy"
          />
        ) : (
          <div className="movie-card-img bg-gray-800 flex items-center justify-center">
            <Film className="text-gray-600" size={48} />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold truncate">{Title}</h3>
          <p className="text-gray-300 text-sm">{Year}</p>
        </div>
      </Link>
      
      {/* Watchlist button */}
      <div className="absolute top-2 right-2 z-10">
        <WatchlistButton movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;