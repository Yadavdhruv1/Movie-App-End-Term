# MiniFlix - Movie & Show Explorer 🎬

A modern, responsive React application for exploring movies, viewing details, and managing your personal watchlist. Built with React, TypeScript, and Tailwind CSS.

![MiniFlix Screenshot](https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## 🌟 Features

- **Movie Exploration**: Browse trending movies and discover new titles
- **Search Functionality**: Find movies by title with real-time search
- **Movie Details**: View comprehensive movie information including ratings, cast, and plot
- **Watchlist Management**: Save movies to your watchlist for later viewing
- **Responsive Design**: Seamless experience across all devices
- **Modern UI**: Clean and intuitive interface with smooth animations

## 🚀 Live Demo

Check out the live demo: [MiniFlix Demo](https://fanciful-beijinho-d52900.netlify.app)

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Context API** for state management
- **Tailwind CSS** for styling
- **OMDB API** for movie data
- **Lucide React** for icons
- **React Hot Toast** for notifications

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/miniflix.git
   cd miniflix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OMDB API key:
   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components
│   ├── movie/         # Movie-related components
│   └── ui/            # Generic UI components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API services
└── types/             # TypeScript type definitions
```

## 🔍 Key Features Explained

### Movie Search
- Real-time search functionality
- Pagination for search results
- Error handling and loading states

### Watchlist Management
- Local storage persistence
- Add/remove movies
- Visual feedback with toast notifications

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing movie data
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

Name - Dhruv Yadav

Project Link: fanciful-beijinho-d52900.netlify.app
