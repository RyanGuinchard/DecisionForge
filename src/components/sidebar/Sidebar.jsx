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
      <nav
        className={`bg-gray-800 text-white w-64 h-screen fixed p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <ul className="space-y-4">
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