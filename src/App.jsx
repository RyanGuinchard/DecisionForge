import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/main/Mainpage";
import Game from "./pages/game/Game";
import "./App.css";

function App() {
  return (
    <>
      <Router>
          <div>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/games/:title" element={<Game />} />
            </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;
