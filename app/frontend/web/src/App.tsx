import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import GenEdsPage from "./pages/GenEds";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gen-eds" element={<GenEdsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
