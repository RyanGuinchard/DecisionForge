import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [games, setGames] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
      >
        <span className="sr-only">Open main menu</span>
        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav
        className={`bg-gray-800 text-white w-full h-screen fixed p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out`}
      >
        <ul className="space-y-4 text-center md:text-left mt-12 md:mt-0">
          {games.map(game => (
            <li key={game._id}>
              <Link
                to={`/game/${encodeURIComponent(game.title)}`}
                className="hover:bg-gray-700 p-2 block rounded"
                onClick={() => setIsOpen(false)}  // Close the menu on link click
              >
                {game.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;