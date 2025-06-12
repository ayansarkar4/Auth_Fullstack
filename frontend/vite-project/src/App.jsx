import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Navigate } from "react-router-dom";
import RefreshHandler from "./RefreshHandler.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
