import React from "react";
import { Link } from "react-router-dom";

const NavBarItems = [
  { label: "Home", link: "/" },
  { label: "Gen-Eds", link: "/gen-eds" },
  { label: "Professors", link: "/professors" },
  { label: "Subjects", link: "/subjects" },
];

const NavBar: React.FC = () => {
  return (
    <div className="h-20 w-full bg-gray-800 px-16 flex justify-center">
      <div className="h-full w-full xl:max-w-[1440px] flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-x-8">
          {NavBarItems.map((item, index) => {
            return (
              <Link
                className="text-lg font-semibold text-white"
                key={index}
                to={item.link}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div>
          <Link className="text-lg font-semibold text-white" to="/about">
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
