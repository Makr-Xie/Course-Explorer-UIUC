import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const GenEdsTypes = [
  { label: "Advanced Composition", value: "ADV_COMP" },
  { label: "Western/Comparative Cultures", value: "W_C_C" },
  { label: "Non-Western Cultures", value: "N_W_C" },
  { label: "Humanities & The Arts", value: "HUM_ARTS" },
];

const DemoGenEds = [
  {
    courseCode: "MUS133",
    courseName: "Intro to World Music",
    genEd: "HUM_ARTS",
    hours: 3,
    gpa: 3.73,
  },
  {
    courseCode: "REL104",
    courseName: "Introduction to Asian Mythology",
    genEd: "W_C_C",
    hours: 3,
    gpa: 2.22,
  },
  {
    courseCode: "MUS133",
    courseName: "Intro to World Music",
    genEd: "HUM_ARTS",
    hours: 3,
    gpa: 1.11,
  },
  {
    courseCode: "REL104",
    courseName: "Introduction to Asian Mythology",
    genEd: "W_C_C",
    hours: 3,
    gpa: 2.22,
  },
  {
    courseCode: "MUS133",
    courseName: "Intro to World Music",
    genEd: "HUM_ARTS",
    hours: 3,
    gpa: 3.73,
  },
  {
    courseCode: "REL104",
    courseName: "Introduction to Asian Mythology",
    genEd: "W_C_C",
    hours: 3,
    gpa: 2.22,
  },
];

const GenEdsPage: React.FC = () => {
  const [genEdType, setGenEdType] = useState("All");
  const [genEds, setGenEds] = useState(DemoGenEds);

  useEffect(() => {
    if (genEdType === "All") {
      setGenEds(DemoGenEds);
    } else {
      setGenEds(DemoGenEds.filter((genEd) => genEd.genEd === genEdType));
    }
  }, [genEdType]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 w-full max-w-[1440px] flex flex-col justify-start items-center gap-y-12 mt-12 mx-auto">
        <div className="flex flex-row justify-center items-center gap-x-4">
          {GenEdsTypes.map((type, index) => {
            return (
              <button
                key={index}
                className="bg-gray-700 hover:bg-gray-500 p-4 rounded-lg text-white"
                onClick={() => setGenEdType(type.value)}
              >
                {type.label}
              </button>
            );
          })}
        </div>
        <div className="w-full max-w-[980px] flex flex-col justify-center items-center gap-y-8">
          {genEds.map((genEd, index) => {
            return (
              <button
                key={index}
                className="w-full bg-gray-700 hover:bg-gray-500 p-4 rounded-lg flex flex-row justify-between items-center"
              >
                <p className="text-white">
                  {genEd.courseCode} - {genEd.courseName}
                </p>
                <div className="flex flex-row justify-center items-center gap-x-4">
                  <p className="text-white">Credit Hours: {genEd.hours}</p>
                  <div className="w-px h-4 bg-white" />
                  <p className="text-white">
                    GPA:{" "}
                    <span
                      className={`${genEd.gpa >= 3.0 ? "text-green-500" : genEd.gpa >= 2.0 ? "text-yellow-500" : "text-red-500"}`}
                    >
                      {genEd.gpa}
                    </span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenEdsPage;
