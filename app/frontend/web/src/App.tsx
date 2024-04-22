import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import GenEdsPage from "./pages/GenEds";
import CoursePage from "./pages/Course";
import SubjectsPage from "./pages/Subjects";
import SubjectCoursePage from "./pages/SubjectCourse";
import ProfessorsPage from "./pages/Professors";
import AboutPage from "./pages/About";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gen-eds" element={<GenEdsPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/subjects/:subjectName" element={<SubjectCoursePage />} />
        <Route path="/professors" element={<ProfessorsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
