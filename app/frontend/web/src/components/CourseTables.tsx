import React from "react";
import { useNavigate } from "react-router-dom";
import { FlexibleCourse } from "../utils/courseType";

type CourseTablesProps = {
  courses: FlexibleCourse[];
};

const genEdTypes = ["ACP", "CS", "HUM", "NAT", "QR", "SBS"];

const CourseTables: React.FC<CourseTablesProps> = ({ courses }) => {
  const navigate = useNavigate();

  // Helper function to get GenEd types and subtypes
  const getGenEdSubtypes = (course: FlexibleCourse) => {
    return genEdTypes
      .map((type) => {
        // Check if the course has a value for this GenEd type
        const value = course[type as keyof typeof course];
        return value ? `${type}: ${value}` : "";
      })
      .filter(Boolean) // Remove empty strings
      .join(", "); // Combine them into a single string
  };

  const handleNavCourse = (courseCode: string) => {
    navigate(`/course?course=${courseCode.toLowerCase()}`);
  };

  return (
    <div className="w-full max-w-[980px] flex flex-col justify-center items-center gap-y-8 my-8 overflow-y-auto">
      {courses.map((course, index) => {
        return (
          <button
            key={index}
            className="w-full bg-gray-700 hover:bg-gray-500 p-4 rounded-lg flex flex-row justify-between items-center"
            onClick={() =>
              handleNavCourse(String(course.Subject + " " + course.Course))
            }
          >
            <p className="text-white">
              {course.Subject} {course.Course} - {course["Course Title"]}
            </p>
            <div className="flex flex-row justify-center items-center gap-x-4">
              {getGenEdSubtypes(course) && (
                <>
                  <p className="text-white">{getGenEdSubtypes(course)}</p>
                  <div className="w-px h-4 bg-white" />
                </>
              )}
              <p className="text-white">
                Primary Instructor: {course["Primary Instructor"]}
              </p>
              <div className="w-px h-4 bg-white" />
              <p className="text-white">
                GPA:{" "}
                <span
                  className={`${course["Average Grade"] >= 3.0 ? "text-green-500" : course["Average Grade"] >= 2.0 ? "text-yellow-500" : "text-red-500"}`}
                >
                  {course["Average Grade"]}
                </span>
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CourseTables;
