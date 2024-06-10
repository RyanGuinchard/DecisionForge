import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/main/Mainpage";
import Game from "./pages/game/Game";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />
          <div>
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/game/:title" element={<Game />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
