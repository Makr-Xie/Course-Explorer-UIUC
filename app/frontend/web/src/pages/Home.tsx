import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import CourseTables from "../components/CourseTables";
import { Course } from "../utils/courseType";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  const submitSearch = () => {
    const match = search.match(/([a-zA-Z]+)\s*(\d+)/);
    if (match) {
      const subject = match[1];
      const course = match[2];
      fetchCourseData(subject, course);
    } else {
      console.error("Invalid course format");
    }
  };

  const fetchCourseData = async (subject: string, course: string) => {
    const res = await fetch(
      import.meta.env.VITE_SERVER_LINK + `/courses?subject=${subject}&course=${course}`,
    );
    const data = await res.json();
    setCourses(data);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 flex flex-col justify-center items-center gap-y-4">
        <h1 className="text-white text-2xl font-bold">UIUC Course Explorer</h1>
        <div className="w-full flex flex-row items-center justify-center gap-x-6">
          <SearchBar queryValue={search} setQueryValue={setSearch} />
          <button
            className="bg-gray-700 hover:bg-gray-500 py-2 px-6 rounded-lg text-white"
            onClick={submitSearch}
          >
            Search
          </button>
        </div>
        <CourseTables courses={courses} />
      </div>
    </div>
  );
};

export default HomePage;
