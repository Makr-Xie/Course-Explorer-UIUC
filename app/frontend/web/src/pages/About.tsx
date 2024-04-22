import React from "react";
import NavBar from "../components/NavBar";

const AboutPage: React.FC = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <NavBar />
      <div className="h-4/5 grid grid-cols-12 gap-y-4 px-8">
        <div className="col-span-12 mt-8 flex flex-col justify-start items-center">
          <div className="w-3/4 bg-gray-700 py-4 px-8 rounded-lg flex flex-col justify-between items-start mb-4">
            <h1 className="text-white text-3xl font-bold mb-4">
              About Our Course Explorer
            </h1>
            <p className="text-white text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure do Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure do Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure do
            </p>
          </div>
          <div className="w-3/4 bg-gray-700 py-4 px-8 rounded-lg flex flex-col justify-between items-start">
            <h1 className="text-white text-3xl font-bold mb-4">Our Team</h1>
            <h2 className="text-white text-xl mb-4">[Name]-</h2>
            <p className="text-white text-l mb-4">
              insert bio, role, and any contributions
            </p>
            <h2 className="text-white text-xl mb-4">[Name]-</h2>
            <p className="text-white text-l mb-4">
              insert bio, role, and any contributions
            </p>
            <h2 className="text-white text-xl mb-4">[Name]-</h2>
            <p className="text-white text-l mb-4">
              insert bio, role, and any contributions
            </p>
            <h2 className="text-white text-xl mb-4">[Name]-</h2>
            <p className="text-white text-l mb-4">
              insert bio, role, and any contributions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
