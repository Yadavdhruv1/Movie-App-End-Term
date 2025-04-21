import { Film, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-netflix-black py-6 mt-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Film className="text-netflix-red" size={20} />
            <span className="font-bold text-lg">MiniFlix</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <p>
              Powered by <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="text-netflix-red hover:underline">OMDB API</a>
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-4 md:mt-0">
            <p>© {currentYear} MiniFlix</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;