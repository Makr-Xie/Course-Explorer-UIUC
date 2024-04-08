import React from "react";
import { useSearchParams } from "react-router-dom";
import { DemoGenEds, DemoDescription } from "../utils/demodata";
import NavBar from "../components/NavBar";
// import SearchBar from "../components/SearchBar";

const CoursePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("course"));
  const course = DemoGenEds.find(
    (genEd) => genEd.courseCode.toLowerCase() === searchParams.get("course"),
  );

  // const [sections, setSections] = useState([]);

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 grid grid-cols-12 gap-y-4 px-8">
        <div className="col-span-4 h-auto my-8">{/* <SearchBar /> */}</div>
        <div className="col-span-12 mt-8 flex flex-col justify-start items-center">
          <div className="w-full bg-gray-700 py-4 px-8 rounded-lg flex flex-row justify-between items-center">
            <p className="text-white text-xl font-bold">
              {course?.courseCode || ""} - {course?.courseName || ""}
            </p>
            <div className="flex flex-row justify-center items-center gap-x-4">
              <p className="text-white text-xl font-bold">
                Credit Hours: {course?.hours || ""}
              </p>
              <div className="w-px h-4 bg-white" />
              <p className="text-white text-xl font-bold">
                Average GPA:{" "}
                {course && course.gpa ? (
                  <span
                    className={`${course.gpa >= 3.0 ? "text-green-500" : course.gpa >= 2.0 ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {course.gpa}
                  </span>
                ) : (
                  <span>0.0</span>
                )}
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
