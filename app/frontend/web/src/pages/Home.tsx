import React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 flex flex-col justify-center items-center gap-y-4">
        <h1 className="text-white text-2xl font-bold">UIUC Course Explorer</h1>
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
