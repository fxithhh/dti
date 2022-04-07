import "./App.css";

import Welcome from "./pages/welcome"
import SignUp from "./pages/signup"
import Chessboard from "./pages/chessboard.jsx";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}>
          </Route>
          <Route path="/signup" element={<SignUp />}>
          </Route>
          <Route path="/chessboard" element={<Chessboard />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
