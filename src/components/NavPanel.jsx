import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavPanel = ({ title }) => {
  return (
    <>
      <Link to={`/games/${title}`} className="w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200">
        <h2 className="text-center text-xl font-bold">{title}</h2>
      </Link>
    </>
  );
};

NavPanel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavPanel;
