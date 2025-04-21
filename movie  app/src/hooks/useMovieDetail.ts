import { useState, useEffect } from 'react';
import { MovieDetail, ApiError } from '../types';
import { getMovieById } from '../services/api';

interface UseMovieDetailReturn {
  movie: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching detailed movie information
 */
export const useMovieDetail = (id: string): UseMovieDetailReturn => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      setLoading(true);
      setError(null);
      
      try {
        if (!id) {
          setLoading(false);
          return;
        }
        
        const movieData = await getMovieById(id);
        setMovie(movieData);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Failed to fetch movie details');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetail();
  }, [id]);

  return { movie, loading, error };
};