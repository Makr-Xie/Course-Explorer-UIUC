import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { FlexibleCourse } from "../utils/courseType";
import { DemoDescription } from "../utils/demodata";
import NavBar from "../components/NavBar";
// import SearchBar from "../components/SearchBar";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const genEdTypes = ["ACP", "CS", "HUM", "NAT", "QR", "SBS"];

const CoursePage: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<FlexibleCourse | null>(null);
  const query = useQuery();
  const courseCode = query.get("course");

  const getGenEdSubtypes = (course: FlexibleCourse | null) => {
    if (!course) return "";
    return genEdTypes
      .map((type) => {
        // Check if the course has a value for this GenEd type
        const value = course[type as keyof typeof course];
        return value ? `${type}: ${value}` : "";
      })
      .filter(Boolean) // Remove empty strings
      .join(", "); // Combine them into a single string
  };

  useEffect(() => {
    const [subject, course] = String(courseCode).split(" ");
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_LINK +
            `/course/${encodeURIComponent(subject)}/${encodeURIComponent(course)}`,
        );
        const data = await response.json();
        console.log(data);
        setCourseInfo(data);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      }
    };
    fetchData();
  }, [courseCode]);

  // useEffect(() => {
  //   fetch(`/courses/${searchParams.get("course")}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });

  // const [sections, setSections] = useState([]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 grid grid-cols-12 gap-y-4 px-8">
        <div className="col-span-12 mt-8 flex flex-col justify-start items-center">
          <div className="w-full bg-gray-700 py-4 px-8 rounded-lg flex flex-row justify-between items-center">
            <p className="text-white text-xl font-bold">
              {courseInfo?.Subject || ""} {courseInfo?.Course || ""} -{" "}
              {courseInfo?.["Course Title"] || ""}
            </p>
            <div className="flex flex-row justify-center items-center gap-x-4">
              {getGenEdSubtypes(courseInfo) && (
                <>
                  <p className="text-white">{getGenEdSubtypes(courseInfo)}</p>
                  <div className="w-px h-4 bg-white" />
                </>
              )}
              <p className="text-white">
                Primary Instructor: {courseInfo?.["Primary Instructor"]}
              </p>
              <div className="w-px h-4 bg-white" />
              <p className="text-white">
                GPA:{" "}
                <span
                  className={`${courseInfo && courseInfo["Average Grade"] >= 3.0 ? "text-green-500" : courseInfo && courseInfo["Average Grade"] >= 2.0 ? "text-yellow-500" : "text-red-500"}`}
                >
                  {courseInfo?.["Average Grade"]}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full h-96 rounded-lg bg-gray-700 mt-8 flex flex-col justify-start items-start">
            <p className="text-white p-8">{DemoDescription}</p>
            {/* {sections.map((section, index) => {
              return (
                <div key={index} className="w-full bg-black p-4 rounded-lg my-4">

                </div>
              );
            } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
