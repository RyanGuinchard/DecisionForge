import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from '../../components/BackButton';
import CategoryPanel from "../../components/CategoryPanel";

const Game = () => {
  const { title } = useParams();
  const [game, setGame] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/games/${title}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((err) => console.error("Error fetching specific game: " + err));
  }, [apiUrl, title]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      <BackButton />
      <div className="relative w-full flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold">{game.title}</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {game.choices.map((category, index) => (
          <CategoryPanel key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Game;
