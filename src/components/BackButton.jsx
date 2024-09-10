import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-16 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 z-50
      bg-opacity-80 hover:bg-opacity-100 backdrop-blur-md
      text-sm md:text-base shadow-md
      md:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
      "
    >
      Back to Home
    </button>
  );
};

export default BackButton;
