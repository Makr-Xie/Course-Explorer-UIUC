import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import type { Course } from "../utils/courseType";
import CourseTables from "../components/CourseTables";

const SubjectCoursePage: React.FC = () => {
  const { subjectName } = useParams();
  const [data, setData] = useState<Course[]>([]); // State to store the fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_LINK +
            `/subjects/${encodeURIComponent(String(subjectName))}`,
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [subjectName]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black overflow-y-auto">
      <NavBar />
      <div className="w-full max-w-[980px] mx-auto py-4">
        <h1 className="text-gray-500 text-lg font-bold text-left">
          {subjectName}
        </h1>
        <div className="h-px bg-gray-500 w-full my-2" />
        <div className="flex-auto overflow-y-auto">
          <CourseTables courses={data} />
        </div>
      </div>
    </div>
  );
};

export default SubjectCoursePage;
