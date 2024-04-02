import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import GenEdsPage from "./pages/GenEds";
import CoursePage from "./pages/Course";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gen-eds" element={<GenEdsPage />} />
        <Route path="/course" element={<CoursePage />} />
      </Routes>
    </Router>
  );
};

export default App;
