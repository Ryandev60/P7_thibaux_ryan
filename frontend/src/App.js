import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home'
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
    {/* <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/profile">Profile</Link>
    </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
