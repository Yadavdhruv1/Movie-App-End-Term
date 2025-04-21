import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Search, BookmarkCheck, Menu, X } from 'lucide-react';
import { useWatchlist } from '../../context/WatchlistContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black bg-opacity-95 shadow-md' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Film className="text-netflix-red" size={26} />
            <span className="font-bold text-xl">MiniFlix</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-netflix-red transition-colors">
              Home
            </Link>
            <Link to="/watchlist" className="text-sm font-medium hover:text-netflix-red transition-colors flex items-center gap-1">
              Watchlist
              {watchlist.length > 0 && (
                <span className="bg-netflix-red rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </nav>
          
          {/* Search Form - Desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pr-10"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-slide-down">
            <nav className="flex flex-col gap-4 mb-4">
              <Link to="/" className="text-sm font-medium hover:text-netflix-red transition-colors">
                Home
              </Link>
              <Link to="/watchlist" className="text-sm font-medium hover:text-netflix-red transition-colors flex items-center gap-1">
                Watchlist
                {watchlist.length > 0 && (
                  <span className="bg-netflix-red rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {watchlist.length}
                  </span>
                )}
              </Link>
            </nav>
            
            {/* Search Form - Mobile */}
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input pr-10 w-full"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;