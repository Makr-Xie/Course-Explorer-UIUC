import React, { useEffect } from "react";
import { Course } from "../utils/courseType";

type CourseTablesProps = {
  courses: Course[];
};

const CourseTables: React.FC<CourseTablesProps> = ({ courses }) => {
  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <div className="h-auto w-full max-w-[1440px] flex flex-col justify-start items-center gap-y-12 mt-12 mx-auto"></div>
  );
};

export default CourseTables;
