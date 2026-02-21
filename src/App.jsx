import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;