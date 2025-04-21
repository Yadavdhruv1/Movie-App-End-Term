import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovieDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import WatchlistButton from '../components/movie/WatchlistButton';
import { Star, Clock, Calendar, Award, ArrowLeft, Film } from 'lucide-react';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetail(id || '');
  const navigate = useNavigate();
  
  const goBack = () => navigate(-1);
  
  if (loading) {
    return (
      <div className="container-custom pt-12 pb-8">
        <LoadingSpinner size={40} className="py-20" />
      </div>
    );
  }
  
  if (error || !movie) {
    return (
      <div className="container-custom pt-12 pb-8">
        <button onClick={goBack} className="btn-outline mb-6 flex items-center gap-2">
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Error Loading Movie</h2>
          <p className="text-gray-300 mb-6">{error || 'Movie not found'}</p>
          <button onClick={goBack} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // Format metadata
  const releaseYear = movie.Year;
  const runtime = movie.Runtime !== 'N/A' ? movie.Runtime : 'Unknown';
  const genres = movie.Genre.split(', ');
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const imdbRating = movie.imdbRating !== 'N/A' ? movie.imdbRating : null;
  
  return (
    <div className="animate-fade-in">
      {/* Background image header with gradient overlay */}
      {hasPoster && (
        <div className="w-full h-80 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-center bg-cover blur-sm opacity-30" 
            style={{ backgroundImage: `url(${movie.Poster})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-netflix-dark/90 to-netflix-dark/80" />
        </div>
      )}
      
      <div className="container-custom pt-6 pb-12 relative z-10 -mt-40">
        <button onClick={goBack} className="btn-outline mb-6 flex items-center gap-2">
          <ArrowLeft size={16} />
          Back
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            {hasPoster ? (
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="w-full max-w-xs mx-auto md:mx-0 rounded-md shadow-lg"
              />
            ) : (
              <div className="w-full aspect-[2/3] max-w-xs mx-auto md:mx-0 bg-gray-800 rounded-md shadow-lg flex items-center justify-center">
                <Film className="text-gray-600" size={64} />
              </div>
            )}
          </div>
          
          {/* Movie details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.Title}</h1>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-4">
              {releaseYear && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{releaseYear}</span>
                </div>
              )}
              
              {runtime && (
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-gray-400" />
                  <span>{runtime}</span>
                </div>
              )}
              
              {imdbRating && (
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  <span>{imdbRating}/10</span>
                </div>
              )}
              
              {movie.Rated !== 'N/A' && (
                <div className="px-2 py-0.5 bg-gray-800 rounded text-xs">
                  {movie.Rated}
                </div>
              )}
            </div>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map((genre, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            {/* Watchlist button */}
            <div className="mb-6">
              <WatchlistButton movie={movie} size="lg" showText />
            </div>
            
            {/* Plot */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.Plot !== 'N/A' ? movie.Plot : 'No overview available.'}
              </p>
            </div>
            
            {/* Additional info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cast & Crew */}
              <div>
                {movie.Director !== 'N/A' && (
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-300 mb-1">Director</h3>
                    <p>{movie.Director}</p>
                  </div>
                )}
                
                {movie.Actors !== 'N/A' && (
                  <div>
                    <h3 className="font-bold text-gray-300 mb-1">Cast</h3>
                    <p>{movie.Actors}</p>
                  </div>
                )}
              </div>
              
              {/* Awards & Info */}
              <div>
                {movie.Awards !== 'N/A' && (
                  <div className="mb-3 flex items-start gap-2">
                    <Award size={18} className="text-yellow-500 mt-0.5" />
                    <p>{movie.Awards}</p>
                  </div>
                )}
                
                {movie.BoxOffice !== 'N/A' && (
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-300 mb-1">Box Office</h3>
                    <p>{movie.BoxOffice}</p>
                  </div>
                )}
                
                {movie.Production !== 'N/A' && (
                  <div>
                    <h3 className="font-bold text-gray-300 mb-1">Production</h3>
                    <p>{movie.Production}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;