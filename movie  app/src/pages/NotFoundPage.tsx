import { Link } from 'react-router-dom';
import { Home, Film } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container-custom pt-8 pb-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <Film className="text-netflix-red mb-4" size={64} />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to browsing movies!
      </p>
      <Link to="/" className="btn-primary flex items-center gap-2">
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;