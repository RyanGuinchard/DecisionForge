import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/main/Mainpage";
import Game from "./pages/game/Game";
import Admin from "./pages/admin/Admin";
import "./App.css";

function App() {
  return (
    <>
      <Router>
          <div>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/games/:title" element={<Game />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;
