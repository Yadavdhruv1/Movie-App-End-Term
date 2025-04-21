import { useState, useEffect, useCallback } from 'react';
import { Movie, ApiError } from '../types';
import { searchMovies } from '../services/api';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  page: number;
  setPage: (page: number) => void;
  fetchMovies: (query: string, page?: number) => Promise<void>;
}

/**
 * Custom hook for fetching movies from OMDB API
 */
export const useMovies = (initialQuery = ''): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>(initialQuery);

  const fetchMovies = useCallback(async (searchQuery: string, pageNum = 1) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      const data = await searchMovies(searchQuery, pageNum);
      
      if (data.Response === 'True' && data.Search) {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No results found');
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch movies');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch movies when page changes or on initial load if query exists
  useEffect(() => {
    if (query) {
      fetchMovies(query, page);
    }
  }, [page, query, fetchMovies]);

  return {
    movies,
    loading,
    error,
    totalResults,
    page,
    setPage,
    fetchMovies
  };
};