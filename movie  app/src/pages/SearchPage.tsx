import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import SearchBar from '../components/ui/SearchBar';
import MovieGrid from '../components/movie/MovieGrid';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const { 
    movies, 
    loading, 
    error, 
    totalResults, 
    page, 
    setPage, 
    fetchMovies 
  } = useMovies(initialQuery);
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  // Handle search submission
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      fetchMovies(query, 1); // Reset to page 1 for new searches
    }
  };
  
  // Update search when URL query param changes
  useEffect(() => {
    const urlQuery = queryParams.get('q') || '';
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
      if (urlQuery) {
        fetchMovies(urlQuery, 1);
      }
    }
  }, [location.search, queryParams, fetchMovies, searchQuery]);
  
  // Calculate pagination
  const totalPages = Math.ceil(totalResults / 10); // OMDB returns 10 results per page
  
  return (
    <div className="container-custom pt-8">
      {/* Search header */}
      <div className="flex items-center gap-3 mb-6">
        <Search className="text-netflix-red" size={24} />
        <h1 className="text-2xl font-bold">Search Movies</h1>
      </div>
      
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch} 
          initialQuery={searchQuery} 
          placeholder="Search for movies by title..." 
        />
      </div>
      
      {/* Search results */}
      {searchQuery ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-1">
              Search results for: <span className="text-netflix-red">{searchQuery}</span>
            </h2>
            {!loading && !error && totalResults > 0 && (
              <p className="text-gray-400 text-sm">
                Found {totalResults} results
              </p>
            )}
          </div>
          
          {loading ? (
            <LoadingSpinner size={40} className="py-12" />
          ) : (
            <MovieGrid movies={movies} error={error} />
          )}
          
          {/* Pagination */}
          {totalPages > 1 && !loading && !error && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button 
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-outline p-2 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="text-sm">
                Page {page} of {totalPages}
              </div>
              
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="btn-outline p-2 disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 flex flex-col items-center">
          <Search className="text-gray-700 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-300 mb-3">Start searching for movies</h3>
          <p className="text-gray-400">Enter a movie title in the search bar above</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;