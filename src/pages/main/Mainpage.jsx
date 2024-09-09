import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import NavPanel from '../../components/NavPanel';

const Mainpage = () => {
  const [games, setGames] = useState([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/games`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          setGames([]); // Set an empty array if data is not an array
        }
      })
      .catch(err => {
        console.error('Error fetching full game list:', err);
        setError('Error fetching game list. Please try again later.');
        setGames([]); // Set an empty array in case of an error
      });
  }, [apiUrl]);

  const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-2">Welcome to DecisionForge</h1>
          <p className="text-xl mb-6">Get started by selecting a game to randomize your choices.</p>
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex flex-wrap justify-center gap-4">
          {filteredGames.map(game => (
            <NavPanel key={game._id} title={game.title} />
          ))}
        </div>

        {/* <button
          onClick={() => navigate('/admin/login')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Admin Login
        </button> */}
      </div>
    </>
  );
};

export default Mainpage;
