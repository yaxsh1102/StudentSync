import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {});

  return (
    <footer className="bg-slate-900 pt-20 pb-10 pl-24 text-white">
      <div className="mx-auto flex items-start justify-center space-x-20">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-4xl mb-4 font-extrabold text-transparent bg-clip-text bg-yellow-500">
            StudentSync
          </div>
          <p className="text-gray-400 max-w-[20rem]">
            Unleashing Your Potential: Connect, Engage, and Succeed with
            StudentSync
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl text-yellow-500 font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="flex items-start justify-center flex-col space-y-2">
            <li className="hover:text-yellow-500 transition-all">
              <Link onClick={() => handleClickScroll("about")} to={"/"}>
                Home
              </Link>
            </li>
            <li className="hover:text-yellow-500 transition-all">
              <Link to="/profile">Profile</Link>
            </li>

            <li className="hover:text-yellow-500 transition-all">
              <Link onClick={() => handleClickScroll("faqs")}>FAQs</Link>
            </li>
            <li className="hover:text-yellow-500 transition-all">
              <Link onClick={() => handleClickScroll("about")}>About Us</Link>
            </li>
            <li className="hover:text-yellow-500 transition-all">
              <Link onClick={() => handleClickScroll("contact")}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl text-yellow-500 font-semibold mb-4">
            Services
          </h3>
          <ul className="flex items-start justify-center flex-col space-y-2">
            <li className="hover:text-yellow-500 transition-all">
              <Link onClick={() => handleClickScroll("services")}>
                Services
              </Link>
            </li>
            <li className="hover:text-yellow-500 transition-all inline">
              <Link to="/events">Events</Link>
            </li>
            <li className="hover:text-yellow-500 transition-all inline">
              <Link to="/communities">Communities</Link>
            </li>
            <li className="hover:text-yellow-500 transition-all inline">
              <Link to="/dormitory">Dormitory</Link>
            </li>
            <li className="hover:text-yellow-500 transition-all inline">
              <Link to="/rooms">Flatmate</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-yellow-500 mb-4">
            Subscribe
          </h3>
          <p className="text-gray-400 mb-4">
            Subscribe to our newsletter for updates.
          </p>
          <div className="flex w-full max-w-sm">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full rounded-l-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />

            <button className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-r-lg hover:bg-yellow-300 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10 text-center text-gray-500 text-sm space-x-2">
        © 2024 StudentSync. All rights reserved.
        <Link to="/" className="hover:text-yellow-500 ml-4">
          Privacy Poilicy
        </Link>
        <span>|</span>
        <Link
          to="/"
          className="hover:text-yellow-500 ml-4 flex items-center justify-center space-x-2"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
