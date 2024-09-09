import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";

const CategoryPanel = ({ category, triggerReroll }) => {
  const [currentOption, setCurrentOption] = useState(category.options[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const startScrolling = () => {
      setIsAnimating(true);
      setAnimationFinished(false);
      const animationDuration = 2000; // Animation duration in milliseconds
      const intervalDuration = 100; // Interval duration in milliseconds

      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * category.options.length);
        setCurrentOption(category.options[randomIndex]);
      }, intervalDuration);

      setTimeout(() => {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * category.options.length);
        setCurrentOption(category.options[finalIndex]);
        setIsAnimating(false);
        setAnimationFinished(true);
      }, animationDuration);
    };

    startScrolling();
  }, [category.options]);

  const reroll = useCallback(() => {
    if (isLocked) return;

    setIsAnimating(true);
    setAnimationFinished(false);
    const animationDuration = 2000; // Animation duration in milliseconds
    const intervalDuration = 100; // Interval duration in milliseconds

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * category.options.length);
      setCurrentOption(category.options[randomIndex]);
    }, intervalDuration);

    setTimeout(() => {
      clearInterval(interval);
      const finalIndex = Math.floor(Math.random() * category.options.length);
      setCurrentOption(category.options[finalIndex]);
      setIsAnimating(false);
      setAnimationFinished(true);
    }, animationDuration);
  }, [category.options, isLocked]);

  useEffect(() => {
    if (triggerReroll && !isLocked) {
      reroll();
    }
  }, [triggerReroll, reroll, isLocked]);

  const toggleLock = () => {
    setIsLocked((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-64 text-center">
      <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
      <p
        className={`text-lg font-semibold mb-4 ${
          isAnimating
            ? "text-gray-500"
            : animationFinished
            ? "text-green-500"
            : "text-white"
        }`}
      >
        {currentOption}
      </p>
      <button
        onClick={reroll}
        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 text-sm mr-2"
      >
        Reroll
      </button>

      <button
        onClick={toggleLock}
        className={`px-2 py-1 rounded-md transition duration-200 text-sm ${
          isLocked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-500 text-white hover:bg-gray-600"
        }`}
      >
        {isLocked ? "Unlock" : "Lock"}
      </button>
    </div>
  );
};

CategoryPanel.propTypes = {
  category: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  triggerReroll: PropTypes.bool.isRequired,
};

export default CategoryPanel;