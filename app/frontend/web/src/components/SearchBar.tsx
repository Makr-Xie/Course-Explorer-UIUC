import React from "react";

type SearchBarProps = {
  queryValue: string;
  setQueryValue: (val: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ queryValue, setQueryValue }) => {
  return (
    <div className="rounded-full bg-gray-700 w-fit h-10 p-2 flex flex-row justify-center items-center gap-x-4 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search w-5 h-5"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <input
        type="text"
        className="font-bold text-xl bg-transparent focus:outline-none"
        placeholder="Course code or name"
        value={String(queryValue)}
        onChange={(e) => setQueryValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
