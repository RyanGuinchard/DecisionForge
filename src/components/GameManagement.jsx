import { useState } from "react";
import PropTypes from "prop-types";


const GameManagement = ({ games, onGameSelect, setGames }) => {
  const [newGameTitle, setNewGameTitle] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const addGame = () => {
    fetch(`${apiUrl}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newGameTitle }),
    })
      .then((response) => response.json())
      .then((addedGame) => {
        setGames([...games, addedGame]);
        setNewGameTitle("");
        onGameSelect(addedGame); // Select the newly added game
      })
      .catch((err) => console.error("Error adding game:", err));
  };

  const deleteGame = () => {
    if (!games.length) return;

    fetch(`${apiUrl}/games/${games[0].id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGames(games.filter((game) => game.id !== games[0].id));
        onGameSelect(null); // Clear the selected game
      })
      .catch((err) => console.error("Error deleting game:", err));
  };

  return (
    <div className="w-full max-w-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Manage Games</h2>

      {/* Add New Game */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New Game Title"
          value={newGameTitle}
          onChange={(e) => setNewGameTitle(e.target.value)}
          className="p-2 flex-grow rounded-lg text-gray-900"
        />
        <button
          onClick={addGame}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Add Game
        </button>
      </div>

      {/* Game Selector with Delete Option */}
      <div className="flex items-center">
        <select
          onChange={(e) =>
            onGameSelect(
              games.find((game) => game.id === Number(e.target.value))
            )
          }
          className="p-2 flex-grow text-gray-900 rounded-lg"
        >
          <option>Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </select>
        <button
          onClick={deleteGame}
          className="ml-2 p-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

GameManagement.propTypes = {
  games: PropTypes.object.isRequired,
  setGames: PropTypes.func.isRequired,
  onGameSelect: PropTypes.func.isRequired,
};

export default GameManagement;
