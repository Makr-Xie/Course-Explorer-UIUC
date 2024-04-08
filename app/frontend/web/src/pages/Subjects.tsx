import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { DemoGenEds } from "../utils/demodata";

const Subjects = [
  { label: "AAS", value: "AAS" },
  { label: "ABE", value: "ABE" },
  { label: "ACCY", value: "ACCY" },
  { label: "ACE", value: "ACE" },
  { label: "ACES", value: "ACES" },
  { label: "ADV", value: "ADV" },
  { label: "AE", value: "AE" },
  { label: "AFRO", value: "AFRO" },
  { label: "AFST", value: "AFST" },
  { label: "AGCM", value: "AGCM" },
  { label: "AGED", value: "AGED" },
  { label: "AHS", value: "AHS" },
  { label: "AIS", value: "AIS" },
  { label: "ALEC", value: "ALEC" },
  { label: "ANSC", value: "ANSC" },
  { label: "ANTH", value: "ANTH" },
  { label: "ARAB", value: "ARAB" },
  { label: "ARCH", value: "ARCH" },
  { label: "ART", value: "ART" },
  { label: "ARTD", value: "ARTD" },
  { label: "ARTE", value: "ARTE" },
  { label: "ARTF", value: "ARTF" },
  { label: "ARTH", value: "ARTH" },
  { label: "ARTJ", value: "ARTJ" },
  { label: "ARTS", value: "ARTS" },
  { label: "ASRM", value: "ASRM" },
  { label: "ASTR", value: "ASTR" },
  { label: "ATMS", value: "ATMS" },
  { label: "BADM", value: "BADM" },
  { label: "BCOG", value: "BCOG" },
  { label: "BCS", value: "BCS" },
  { label: "BDI", value: "BDI" },
  { label: "BIOC", value: "BIOC" },
  { label: "BIOE", value: "BIOE" },
  { label: "BIOP", value: "BIOP" },
  { label: "BTW", value: "BTW" },
  { label: "BUS", value: "BUS" },
  { label: "CEE", value: "CEE" },
  { label: "CHBE", value: "CHBE" },
  { label: "CHEM", value: "CHEM" },
  { label: "CHIN", value: "CHIN" },
  { label: "CHLH", value: "CHLH" },
  { label: "CHP", value: "CHP" },
  { label: "CI", value: "CI" },
  { label: "CLCV", value: "CLCV" },
  { label: "CMN", value: "CMN" },
  { label: "CPSC", value: "CPSC" },
  { label: "CS", value: "CS" },
  { label: "CW", value: "CW" },
  { label: "CWL", value: "CWL" },
  { label: "DANC", value: "DANC" },
  { label: "DTX", value: "DTX" },
  { label: "EALC", value: "EALC" },
  { label: "ECE", value: "ECE" },
  { label: "ECON", value: "ECON" },
  { label: "EDUC", value: "EDUC" },
  { label: "EIL", value: "EIL" },
  { label: "ENG", value: "ENG" },
  { label: "ENGL", value: "ENGL" },
  { label: "ENSU", value: "ENSU" },
  { label: "ENVS", value: "ENVS" },
  { label: "EOL", value: "EOL" },
  { label: "EPOL", value: "EPOL" },
  { label: "EPS", value: "EPS" },
  { label: "EPSY", value: "EPSY" },
  { label: "ERAM", value: "ERAM" },
  { label: "ESE", value: "ESE" },
  { label: "ETMA", value: "ETMA" },
  { label: "EURO", value: "EURO" },
  { label: "FAA", value: "FAA" },
  { label: "FIN", value: "FIN" },
  { label: "FR", value: "FR" },
  { label: "FSHN", value: "FSHN" },
  { label: "GCL", value: "GCL" },
  { label: "GEOG", value: "GEOG" },
  { label: "GEOL", value: "GEOL" },
  { label: "GER", value: "GER" },
  { label: "GGIS", value: "GGIS" },
  { label: "GLBL", value: "GLBL" },
  { label: "GS", value: "GS" },
  { label: "GSD", value: "GSD" },
  { label: "GWS", value: "GWS" },
  { label: "HDFS", value: "HDFS" },
  { label: "HIST", value: "HIST" },
  { label: "HORT", value: "HORT" },
  { label: "HRD", value: "HRD" },
  { label: "IB", value: "IB" },
  { label: "IE", value: "IE" },
  { label: "IHLT", value: "IHLT" },
  { label: "INFO", value: "INFO" },
  { label: "IS", value: "IS" },
  { label: "ITAL", value: "ITAL" },
  { label: "JOUR", value: "JOUR" },
  { label: "JS", value: "JS" },
  { label: "KIN", value: "KIN" },
  { label: "KOR", value: "KOR" },
  { label: "LA", value: "LA" },
  { label: "LAS", value: "LAS" },
  { label: "LAST", value: "LAST" },
  { label: "LAW", value: "LAW" },
  { label: "LEAD", value: "LEAD" },
  { label: "LER", value: "LER" },
  { label: "LING", value: "LING" },
  { label: "LLS", value: "LLS" },
  { label: "MACS", value: "MACS" },
  { label: "MATH", value: "MATH" },
  { label: "MBA", value: "MBA" },
  { label: "MCB", value: "MCB" },
  { label: "MDIA", value: "MDIA" },
  { label: "ME", value: "ME" },
  { label: "MILS", value: "MILS" },
  { label: "MSE", value: "MSE" },
  { label: "MUS", value: "MUS" },
  { label: "MUSC", value: "MUSC" },
  { label: "MUSE", value: "MUSE" },
  { label: "NPRE", value: "NPRE" },
  { label: "NRES", value: "NRES" },
  { label: "NS", value: "NS" },
  { label: "NUTR", value: "NUTR" },
  { label: "PATH", value: "PATH" },
  { label: "PHIL", value: "PHIL" },
  { label: "PHYS", value: "PHYS" },
  { label: "PLPA", value: "PLPA" },
  { label: "POL", value: "POL" },
  { label: "PORT", value: "PORT" },
  { label: "PS", value: "PS" },
  { label: "PSM", value: "PSM" },
  { label: "PSYC", value: "PSYC" },
  { label: "REHB", value: "REHB" },
  { label: "REL", value: "REL" },
  { label: "RHET", value: "RHET" },
  { label: "RSOC", value: "RSOC" },
  { label: "RST", value: "RST" },
  { label: "RUSS", value: "RUSS" },
  { label: "SBC", value: "SBC" },
  { label: "SCAN", value: "SCAN" },
  { label: "SE", value: "SE" },
  { label: "SHS", value: "SHS" },
  { label: "SLAV", value: "SLAV" },
  { label: "SLCL", value: "SLCL" },
  { label: "SOC", value: "SOC" },
  { label: "SOCW", value: "SOCW" },
  { label: "SPAN", value: "SPAN" },
  { label: "SPED", value: "SPED" },
  { label: "STAT", value: "STAT" },
  { label: "TAM", value: "TAM" },
  { label: "TE", value: "TE" },
  { label: "THEA", value: "THEA" },
  { label: "TRST", value: "TRST" },
  { label: "TSM", value: "TSM" },
  { label: "UKR", value: "UKR" },
  { label: "UP", value: "UP" },
  { label: "VCM", value: "VCM" },
  { label: "VM", value: "VM" },
  { label: "YDSH", value: "YDSH" },
];

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("All");
  const [courses, setCourses] = useState(DemoGenEds);

  useEffect(() => {
    if (subject === "All") {
      setCourses(DemoGenEds);
    } else {
      setCourses(DemoGenEds.filter((course) => course.subject === subject));
    }
  }, [subject]);

  const handleNavCourse = (courseCode: string) => {
    navigate(`/course?course=${courseCode.toLowerCase()}`);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="flex flex-row justify-start items-center gap-x-4 overflow-x-auto whitespace-nowrap p-4">
  <div className="flex space-x-4">
    {Subjects.map((subj, index) => {
      return (
        <button
          key={index}
          className="bg-gray-700 hover:bg-gray-500 p-4 rounded-lg text-white flex-shrink-0"
          onClick={() => setSubject(subj.value)}
        >
          {subj.label}
        </button>
      );
    })}
  </div>
</div>
<div className="h-4/5 w-full max-w-[1440px] flex flex-col justify-start items-center gap-y-12 mt-12 mx-auto">
        <div className="w-full max-w-[980px] flex flex-col justify-center items-center gap-y-8">
          {courses.map((course, index) => {
            return (
              <button
                key={index}
                className="w-full bg-gray-700 hover:bg-gray-500 p-4 rounded-lg flex flex-row justify-between items-center"
                onClick={() => handleNavCourse(course.courseCode)}
              >
                <p className="text-white">
                  {course.courseCode} - {course.courseName}
                </p>
                <div className="flex flex-row justify-center items-center gap-x-4">
                  <p className="text-white">Credit Hours: {course.hours}</p>
                  <div className="w-px h-4 bg-white" />
                  <p className="text-white">
                    GPA:{" "}
                    <span
                      className={`${
                        course.gpa >= 3.0
                          ? "text-green-500"
                          : course.gpa >= 2.0
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {course.gpa}
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

export default SubjectsPage;