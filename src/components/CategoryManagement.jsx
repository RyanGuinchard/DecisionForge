import { useState } from "react";
import PropTypes from "prop-types";


const CategoryManagement = ({ game, setGames }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingOption, setEditingOption] = useState(null);
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionInput, setNewOptionInput] = useState(""); // For adding new options

  const apiUrl = import.meta.env.VITE_API_URL;

  const addCategory = () => {
    if (!game || !game.id) {
      console.error("Game is not defined or game.id is missing.");
      return;
    }

    fetch(`${apiUrl}/games/${game.id}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: newCategoryName }),
    })
      .then((response) => response.json())
      .then((addedCategory) => {
        setGames((prevGames) =>
          prevGames.map((g) =>
            g.id === game.id
              ? {
                  ...g,
                  categories: [...g.categories, addedCategory],
                }
              : g
          )
        );
        setSelectedCategory(addedCategory); // Automatically select the newly added category
        setNewCategoryName("");
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  const deleteCategory = () => {
    if (!selectedCategory) return;

    fetch(`${apiUrl}/games/${game.id}/categories/${selectedCategory.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGames((prevGames) =>
          prevGames.map((g) =>
            g.id === game.id
              ? {
                  ...g,
                  categories: g.categories.filter(
                    (category) => category.id !== selectedCategory.id
                  ),
                }
              : g
          )
        );
        setSelectedCategory(null);
      })
      .catch((err) => console.error("Error deleting category:", err));
  };

  const editOption = (option) => {
    setEditingOption(option);
    setNewOptionName(option.optionName);
  };

  const saveOption = () => {
    if (!selectedCategory || !editingOption) {
      console.error("Selected category or editing option is not defined.");
      return;
    }

    fetch(
      `${apiUrl}/categories/${selectedCategory.id}/options/${editingOption.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionName: newOptionName }),
      }
    )
      .then((response) => response.json())
      .then((updatedOption) => {
        setGames((prevGames) =>
          prevGames.map((g) =>
            g.id === game.id
              ? {
                  ...g,
                  categories: g.categories.map((category) =>
                    category.id === selectedCategory.id
                      ? {
                          ...category,
                          options: category.options.map((option) =>
                            option.id === updatedOption.id
                              ? updatedOption
                              : option
                          ),
                        }
                      : category
                  ),
                }
              : g
          )
        );
        setEditingOption(null);
        setNewOptionName("");
      })
      .catch((err) => console.error("Error updating option:", err));
  };

  const deleteOption = (optionId) => {
    if (!selectedCategory) {
      console.error("Selected category is not defined.");
      return;
    }

    fetch(
      `${apiUrl}/categories/${selectedCategory.id}/options/${optionId}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setGames((prevGames) =>
          prevGames.map((g) =>
            g.id === game.id
              ? {
                  ...g,
                  categories: g.categories.map((category) =>
                    category.id === selectedCategory.id
                      ? {
                          ...category,
                          options: category.options.filter(
                            (option) => option.id !== optionId
                          ),
                        }
                      : category
                  ),
                }
              : g
          )
        );
      })
      .catch((err) => console.error("Error deleting option:", err));
  };

  const addOption = () => {
    if (!newOptionInput) return;
    if (!selectedCategory) {
      console.error("Selected category is not defined.");
      return;
    }

    fetch(`${apiUrl}/categories/${selectedCategory.id}/options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionName: newOptionInput }),
    })
      .then((response) => response.json())
      .then((addedOption) => {
        setGames((prevGames) =>
          prevGames.map((g) =>
            g.id === game.id
              ? {
                  ...g,
                  categories: g.categories.map((category) =>
                    category.id === selectedCategory.id
                      ? {
                          ...category,
                          options: [...category.options, addedOption],
                        }
                      : category
                  ),
                }
              : g
          )
        );
        setNewOptionInput("");
      })
      .catch((err) => console.error("Error adding option:", err));
  };

  return (
    <div className="w-full max-w-md mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Manage Categories for {game?.title || "Loading..."}
      </h2>

      {/* Add New Category */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="p-2 flex-grow rounded-lg text-gray-900"
        />
        <button
          onClick={addCategory}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Add Category
        </button>
      </div>

      {/* Category Selector with Edit and Delete Option */}
      <div className="flex items-center">
        <select
          value={selectedCategory?.id || ""}
          onChange={(e) =>
            setSelectedCategory(
              game.categories.find(
                (category) => category.id === Number(e.target.value)
              )
            )
          }
          className="p-2 flex-grow text-gray-900 rounded-lg"
        >
          <option value="">Select a category</option>
          {game.categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button
          onClick={deleteCategory}
          className="ml-2 p-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>

      {/* Options within Selected Category */}
      {selectedCategory && (
        <div className="mt-4">
          <h3 className="font-semibold">
            {selectedCategory.categoryName} Options
          </h3>

          {/* Add New Option */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="New Option Name"
              value={newOptionInput}
              onChange={(e) => setNewOptionInput(e.target.value)}
              className="p-2 flex-grow rounded-lg text-gray-900"
            />
            <button
              onClick={addOption}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            >
              Add Option
            </button>
          </div>

          <ul>
            {selectedCategory.options?.map((option) => (
              <li
                key={option.id}
                className="flex justify-between items-center mb-2"
              >
                {editingOption && editingOption.id === option.id ? (
                  <input
                    type="text"
                    value={newOptionName}
                    onChange={(e) => setNewOptionName(e.target.value)}
                    className="p-2 flex-grow rounded-lg text-gray-900"
                  />
                ) : (
                  <span>{option.optionName}</span>
                )}
                <div className="ml-4 flex space-x-2">
                  {editingOption && editingOption.id === option.id ? (
                    <button
                      onClick={saveOption}
                      className="p-2 bg-green-500 text-white rounded-lg"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => editOption(option)}
                      className="p-2 bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteOption(option.id)}
                    className="p-2 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

CategoryManagement.propTypes = {
  game: PropTypes.object.isRequired,
  setGames: PropTypes.func.isRequired,
};

export default CategoryManagement;
