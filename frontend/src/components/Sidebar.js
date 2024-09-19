import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {user} = useContext(AppContext)


  const Menus = [
    { title: "Events", src: "calendar", path: "/events" },
    { title: "Communities", src: "chat", path: "/communities" },
    { title: "Dormitory", src: "home", path: "/dormitory" },
    { title: "Flatmate", src: "magnifier", path: "/rooms" },
    { title: "Profile", src: "user", path: `/profile/${user.id}` },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 p-5 pt-8 transition-all duration-300 border-r border-gray-700 ${
          open ? "w-60" : "w-20"
        } z-30`}
      >
        <img
          src="control.png"
          alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-700 border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="logo.png"
            alt="logo"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            StudentSync
          </h1>
        </div>
        <ul className="mt-20">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className="flex rounded-md p-2 cursor-pointer hover:bg-gray-800 hover:text-yellow-400 text-white text-sm items-center gap-x-4"
              onClick={() => handleNavigation(Menu.path)}
            >
              <img src={`${Menu.src}.png`} alt={Menu.title} className="w-5 my-2" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-20"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;