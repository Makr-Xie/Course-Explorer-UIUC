import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { GenEdCourse } from "../utils/courseType";
import CourseTables from "../components/CourseTables";

type GenEdType = {
  label: string;
  value: string;
  subtype: Array<{ label: string; value: string }>;
};

type Selection = {
  type: string;
  subtype?: string;
};

const constructPayload = (
  selections: Selection[],
): { type: string; subtype: string }[] => {
  const payload: { type: string; subtype: string }[] = [];
  selections.forEach((selection) => {
    // payload[selection.type] = selection.subtype || "all"; // Use "all" or "" if no subtype
    if (selection.subtype) {
      payload.push({ type: selection.type, subtype: selection.subtype });
    } else {
      payload.push({ type: selection.type, subtype: "all" });
    }
  });
  return payload;
};

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

const GenEdsTypes: GenEdType[] = [
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
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [genEds, setGenEds] = useState<GenEdCourse[]>([]);

  useEffect(() => {
    const fetchGenEds = async (selections: Selection[]) => {
      const url = new URL(import.meta.env.VITE_SERVER_LINK + "/geneds");
      const payload = constructPayload(selections);
      console.log(payload);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: payload,
          }),
        });
        const data = await response.json();
        console.log(data);
        setGenEds(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    console.log(selections);
    fetchGenEds(selections);
  }, [selections]);

  const handleClickType = (type: string) => {
    setSelectedType(type);
    const index = selections.findIndex((s) => s.type === type);
    if (index === -1) {
      // Add new type if not already in the selections
      if (type === "ACP") {
        setSelections((prev) => [...prev, { type, subtype: "ACP" }]);
      } else {
        setSelections((prev) => [...prev, { type }]);
      }
    }
  };

  const handleClickSubType = (subtype: string) => {
    const type = selectedType;
    if (!type) return;
    const newSelection: Selection = { type, subtype };
    // Add or update the selection
    setSelections((prev) => {
      const existingIndex = prev.findIndex((s) => s.type === type);
      if (existingIndex !== -1) {
        const newSelections = [...prev];
        newSelections[existingIndex] = newSelection; // Replace existing type with new subtype
        return newSelections;
      } else {
        return [...prev, newSelection]; // Add new selection
      }
    });
  };

  const removeChip = (index: number) => {
    setSelections((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 w-full max-w-[1440px] flex flex-col justify-start items-center gap-y-4 mx-auto mt-6">
        <div className="flex flex-row justify-center items-center flex-wrap gap-4 w-full max-w-[960px]">
          {GenEdsTypes.map((type, index) => (
            <button
              key={index}
              className={`${selectedType === type.value ? "bg-gray-500" : "bg-gray-700"} hover:bg-gray-500 p-4 rounded-lg text-white text-sm`}
              onClick={() => handleClickType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
        <div className="flex flex-row justify-center items-center gap-x-4">
          {selectedType &&
            GenEdsTypes.find((t) => t.value === selectedType)?.subtype.map(
              (subtype) => (
                <button
                  key={subtype.value}
                  className={`bg-gray-700 hover:bg-gray-500 p-4 rounded-lg text-white text-sm`}
                  onClick={() => handleClickSubType(subtype.value)}
                >
                  {subtype.label}
                </button>
              ),
            )}
        </div>
        <div className="flex flex-row justify-center items-center flex-wrap gap-4">
          {selections.map((selection, index) => (
            <div
              key={index}
              className="bg-blue-500 hover:bg-blue-400 p-4 rounded-lg text-white text-sm cursor-pointer"
              onClick={() => removeChip(index)}
            >
              {selection.type}
              {selection.subtype ? `/${selection.subtype}` : ""}
            </div>
          ))}
        </div>
        <div className="w-full max-w-[980px] flex-auto overflow-y-auto">
          <CourseTables courses={genEds} />
        </div>
      </div>
    </div>
  );
};

export default GenEdsPage;
