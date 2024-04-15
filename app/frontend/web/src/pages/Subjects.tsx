import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Subjects } from "../utils/subjectLib";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateSubject = (subject: string) => {
    navigate(`/subjects/${subject}`);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black overflow-y-auto">
      <NavBar />
      <div className="flex flex-row justify-start items-center gap-x-4 overflow-x-auto whitespace-nowrap p-4 w-full max-w-[1440px] mx-auto">
        <div className="w-30 flex flex-col gap-y-4 mx-auto">
          {Subjects.map((subj, index) => {
            return (
              <button
                key={index}
                className="bg-gray-700 hover:bg-gray-500 p-4 rounded-lg text-white flex-shrink-0"
                onClick={() => handleNavigateSubject(subj.value)}
              >
                {subj.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
