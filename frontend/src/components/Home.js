import React, { useState } from 'react';
import Explore from './Explore';

const Home = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Events", src: "calendar" },
    { title: "Communities", src: "chat" },
    { title: "Dormitory", src: "home" },
    { title: "Flatmate", src: "magnifier" },
    { title: "Profile", src: "user" },
  ];

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 h-screen bg-purple-600 p-5 pt-8 transition-all duration-300 ${
          open ? "w-60" : "w-20"
        } z-20`}
      >
        <img
          src="control.png"
          alt=""
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="logo.png"
            alt=""
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
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
              className="flex rounded-md p-2 cursor-pointer hover:text-gray-700 hover:scale-105 hover:transition-all hover:duration-75 text-black text-sm items-center gap-x-4"
            >
              <img src={`${Menu.src}.png`} alt="" className="w-5 my-2" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`min-h-screen pl-20 transition-all duration-300 ${open ? 'blur-sm' : ''}`}>
        <Explore />
      </div>

      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Home;