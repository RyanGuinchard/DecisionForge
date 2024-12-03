import { useEffect, useState } from "react";
import AdminModal from "../../components/AdminModal";

const Admin = () => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Full game list fetch for inital render
  useEffect(() => {
    fetch(`${apiUrl}/games`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setGames(data);
        } else {
          setGames([]); // Set an empty array if data is not an array
        }
      })
      .catch((err) => {
        console.error("Error fetching full game list:", err);
        setError("Error fetching game list. Please try again later.");
        setGames([]); // Set an empty array in case of an error
      });
  }, [apiUrl]);

  const handleGameChange = (event) => {
    event.preventDefault();
    const gameTitle = event.target.value;
    setSelectedGame(gameTitle);
    setCategories([]);
    setOptions([]);
    setSelectedCategory(null);
    setSelectedOption(null);
    fetchGameData(gameTitle);
    console.log(gameTitle);
  };

  // Fetching data for the selected game
  const fetchGameData = (gameTitle) => {
    fetch(`${apiUrl}/games/${gameTitle}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedGame(data);
        if (data && Array.isArray(data.choices)) {
          const categories = data.choices.map((choice) => choice.category);
          setCategories(categories);

          const options = data.choices.map((choice) => choice.options).flat();
          setOptions(options);
        }
      });
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    const categoryTitle = event.target.value;
    setSelectedCategory(categoryTitle);
    if (selectedGame && selectedGame.choices) {
      const category = selectedGame.choices.find(
        (choice) => choice.category === categoryTitle
      );
      if (category && Array.isArray(category.options)) {
        setOptions(category.options);
      }
    }
  };

  const handleOptionChange = (event) => {
    event.preventDefault();
    const optionTitle = event.target.value;
    setSelectedOption(optionTitle);
  };

  // Logic for deleting a game, category, or option
  const handleDelete = (event) => {
    event.preventDefault();
    let deleteUrl = `${apiUrl}/games/${selectedGame.title}`;
    if (selectedCategory) {
      deleteUrl += `/category/${selectedCategory}`;
    }
    if (selectedOption) {
      deleteUrl += `/option/${selectedOption}`;
    }

    fetch(deleteUrl, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Network response was not ok");
          });
        }
        // Check if the response body is empty
        if (response.status === 204 || response.headers.get("content-length") === "0") {
          return {};
        }
        return response.json();
      })
      .then((data) => {
        console.log("Delete response: ", data);
        setCategories([]);
        setOptions([]);
        setSelectedGame(null);
        setSelectedCategory(null);
        setSelectedOption(null);
        fetchGameData(selectedGame.title);
      })
      .catch((err) => {
        console.error("Error deleting game data:", err);
        setError("Error deleting game data. Please try again later: ", err.message);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Admin</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Full game list drop */}
      <div className="flex items-center">
        <select id="game-select"
          onChange={handleGameChange}
          className="p-2 flex-grow text-gray-900 rounded-lg"
        >
          <option value="">-- Select a Game --</option>
          {games.map((game) => (
            <option key={game._id} value={game.title}>
              {game.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleDelete}
          className="ml-2 p-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>

      {/* Category list */}
      {selectedGame && (
        <div className="flex items-center">
          <select id="category-select"
            onChange={handleCategoryChange}
            className="p-2 flex-grow text-gray-900 rounded-lg"
          >
            <option value="">-- Select a Category --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            className="ml-2 p-2 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      )}

      {/* Options list */}
      {selectedCategory && (
        <div className="flex items-center">
          <select id="option-select"
            onChange={handleOptionChange}
            className="p-2 flex-grow text-gray-900 rounded-lg"
          >
            <option value="">-- Select an Option --</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            onClick={handleDelete}
            className="ml-2 p-2 bg-red-500 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
