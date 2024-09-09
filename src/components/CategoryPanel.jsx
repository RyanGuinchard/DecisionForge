import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const CategoryPanel = ({ category }) => {
  const [currentOption, setCurrentOption] = useState(category.options[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

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

  const reroll = () => {
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

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-64 text-center'>
      <h2 className='text-2xl font-semibold mb-4'>{category.category}</h2>
      <p
        className={`text-lg font-semibold mb-4 ${isAnimating ? 'text-gray-500' : animationFinished ? 'text-green-500' : 'text-white'}`}
      >
        {currentOption}
      </p>
      <button
        onClick={reroll}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200'
      >
        Reroll
      </button>
    </div>
  );
};

CategoryPanel.propTypes = {
  category: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
};

export default CategoryPanel;
