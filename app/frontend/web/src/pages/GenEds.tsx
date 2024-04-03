import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { GenEdCourse } from "../utils/courseType";
import CourseTables from "../components/CourseTables";

const HUMsubtype = [
  { label: "Literature & the Arts", value: "LA" },
  { label: "Historical & Philosophical Perspectives", value: "HP" },
];

const CSsubtype = [
  { label: "Western/Comparative Cultures", value: "WCC" },
  { label: "Non-Western", value: "NW" },
  { label: "US Minority", value: "US" },
];

const SBSsubtype = [
  { label: "Social Science", value: "SS" },
  { label: "Behavioral Science", value: "BS" },
];

const NATsubtype = [
  { label: "Life Science", value: "LS" },
  { label: "Physical Science", value: "PS" },
];

const QRsubtype = [
  { label: "QR1", value: "QR1" },
  { label: "QR2", value: "QR2" },
];

const GenEdsTypes = [
  { label: "Advanced Composition", value: "ACP", subtype: [] },
  { label: "Humanities and the Arts", value: "HUM", subtype: HUMsubtype },
  {
    label: "Natural Sciences and Technology",
    value: "NAT",
    subtype: NATsubtype,
  },
  { label: "Quantitative Reasoning", value: "QR", subtype: QRsubtype },
  {
    label: "Social and Behavioral Sciences",
    value: "SBS",
    subtype: SBSsubtype,
  },
  { label: "Cultural Studies", value: "CS", subtype: CSsubtype },
];

const GenEdsPage: React.FC = () => {
  const [genEdType, setGenEdType] = useState("All");
  const [genEdSubType, setGenEdSubType] = useState("All");
  const [genEds, setGenEds] = useState<GenEdCourse[]>([]);

  useEffect(() => {
    const fetchGenEds = async (genedType: string, genedSubType: string) => {
      let url = "";
      if (genedType === "" && genedSubType === "") {
        url = `/geneds`;
      } else if (genedSubType === "") {
        url = `/geneds?type=${genedType}`;
      } else {
        url = `/geneds?type=${genedType}&subtype=${genedSubType}`;
      }
      const res = await fetch(import.meta.env.VITE_SERVER_LINK + url);
      const data = await res.json();
      console.log(data);
      setGenEds(data);
    };
    console.log(genEdType, genEdSubType);
    if (genEdType === "All" && genEdSubType === "All") {
      fetchGenEds("", "");
    } else if (genEdSubType === "All") {
      fetchGenEds(genEdType, "");
    } else {
      fetchGenEds(genEdType, genEdSubType);
    }
  }, [genEdType, genEdSubType]);

  const handleClickType = (type: string) => {
    if (type === genEdType) {
      setGenEdType("All");
      setGenEdSubType("All");
      return;
    } else if (type === "ACP") {
      setGenEdType("ACP");
      setGenEdSubType("ACP");
      return;
    }
    setGenEdType(type);
    setGenEdSubType("All");
  };

  const handleClickSubType = (subtype: string) => {
    if (subtype === genEdSubType) {
      setGenEdSubType("All");
      return;
    }
    setGenEdSubType(subtype);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 w-full max-w-[1440px] flex flex-col justify-start items-center gap-y-8 mt-12 mx-auto">
        <div className="flex flex-row justify-center items-center flex-wrap gap-4 w-full max-w-[960px] mt-12">
          {GenEdsTypes.map((type, index) => {
            return (
              <button
                key={index}
                className={`${genEdType === type.value ? "bg-gray-500" : "bg-gray-700"} hover:bg-gray-500 p-4 rounded-lg text-white`}
                onClick={() => handleClickType(type.value)}
              >
                {type.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-row justify-center items-center gap-x-4">
          {GenEdsTypes.find((type) => type.value === genEdType)?.subtype.map(
            (subtype, index) => {
              return (
                <button
                  key={index}
                  className={` ${genEdSubType === subtype.value ? "bg-gray-500" : "bg-gray-700"} hover:bg-gray-500 p-4 rounded-lg text-white`}
                  onClick={() => handleClickSubType(subtype.value)}
                >
                  {subtype.label}
                </button>
              );
            },
          )}
        </div>
        <div className="w-full max-w-[980px] flex flex-col justify-center items-center gap-y-8">
          <CourseTables courses={genEds} />
        </div>
      </div>
    </div>
  );
};

export default GenEdsPage;
