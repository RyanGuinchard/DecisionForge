import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from '../../components/BackButton';
import CategoryPanel from "../../components/CategoryPanel";

const Game = () => {
  const { title } = useParams();
  const [game, setGame] = useState(null);
  const [reRollAll, setRerollAll] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/games/${title}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((err) => console.error("Error fetching specific game: " + err));
  }, [apiUrl, title]);

  useEffect(() => {
    document.title = game ? `${game.title} Randomizer` : "Loading...";
  });

  if (!game) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  const handleRerollAll = () => {
    setRerollAll((prevState) => !prevState);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      <BackButton />
      <div className="relative w-full flex flex-col items-center justify-center mb-8">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center">{game.title}</h1>
        
        {/* Centered Reroll All button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={handleRerollAll}
        >
          Reroll All
        </button>
      </div>

      {/* Category panels */}
      <div className="flex flex-wrap justify-center gap-4">
        {game.choices.map((category, index) => (
          <CategoryPanel key={index} category={category} triggerReroll={reRollAll} />
        ))}
      </div>
    </div>
  );
};

export default Game;
