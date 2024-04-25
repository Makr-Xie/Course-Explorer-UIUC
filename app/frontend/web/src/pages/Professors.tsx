import React, { useState } from "react";
import NavBar from "../components/NavBar";

type Professor = {
  name: string;
  courses: {
    subject: string;
    courseNumber: string;
    title: string;
    averageGrade: number;
  }[];
  rating: number;
};

const ProfessorsPage: React.FC = () => {
  const professors: Professor[] = [
    {
      name: "Lee, Sang S",
      courses: [
        {
          subject: "AAS",
          courseNumber: "100",
          title: "Intro Asian American Studies",
          averageGrade: 3.53,
        },
      ],
      rating: 3.5,
    },
    {
      name: "Zhang, Yuanhui",
      courses: [
        {
          subject: "ABE",
          courseNumber: "225",
          title: "ABE Principles: Bioenvironment",
          averageGrade: 3.09,
        },
        {
          subject: "ABE",
          courseNumber: "501",
          title: "Graduate Research I",
          averageGrade: 3.91,
        },
      ],
      rating: 4.0,
    },
    {
      name: "Singh, Vijay",
      courses: [
        {
          subject: "ABE",
          courseNumber: "226",
          title: "ABE Principles: Bioprocessing",
          averageGrade: 3.33,
        },
        {
          subject: "ABE",
          courseNumber: "488",
          title: "Bioprocessing Biomass for Fuel",
          averageGrade: 3.35,
        },
      ],
      rating: 3.3,
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getRatingColor = (rating: number) => {
    if (rating < 2.5) {
      return "text-red-500";
    } else if (rating < 3.5) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 w-full max-w-[1440px] flex flex-col justify-start items-center gap-y-4 mx-auto mt-6">
        <div className="w-full max-w-[980px] px-4">
          <input
            type="text"
            placeholder="Search professor by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full max-w-[980px] flex-auto overflow-y-auto">
          <div className="space-y-6">
            {filteredProfessors.map((professor, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 text-white"
              >
                <h2 className="text-2xl font-bold mb-2">{professor.name}</h2>
                <p
                  className={`text-xl mb-4 ${getRatingColor(professor.rating)}`}
                >
                  Professor Rating: {professor.rating.toFixed(1)}
                </p>
                <div className="space-y-4">
                  {professor.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="bg-black rounded-lg p-4">
                      <p>
                        {course.subject} {course.courseNumber} - {course.title}
                      </p>
                      <p>Average Grade: {course.averageGrade.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorsPage;
