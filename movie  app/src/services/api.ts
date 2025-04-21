import { Movie, MovieDetail, MovieSearchResponse, ApiError } from '../types';

const API_KEY = 'a2ee96d4';
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Fetch movies based on search query
 */
export async function searchMovies(query: string, page = 1): Promise<MovieSearchResponse> {
  try {
    const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      return {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: data.Error || 'No results found'
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw {
      message: error instanceof Error ? error.message : 'Failed to fetch movies',
    } as ApiError;
  }
}

/**
 * Fetch movie details by IMDb ID
 */
export async function getMovieById(id: string): Promise<MovieDetail> {
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw {
      message: error instanceof Error ? error.message : 'Failed to fetch movie details',
    } as ApiError;
  }
}

/**
 * Get trending/popular movies (since OMDB doesn't have a trending endpoint,
 * we'll search for common terms to simulate trending)
 */
export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    // Using popular search terms to simulate trending
    const popularTerms = ['marvel', 'star', 'avengers', 'batman', 'mission'];
    const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
    
    const data = await searchMovies(randomTerm);
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw {
      message: error instanceof Error ? error.message : 'Failed to fetch trending movies',
    } as ApiError;
  }
}