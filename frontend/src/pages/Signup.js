import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const inputRefs = useRef({});
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleLoginSuccess = async (credentialResponse) => {};

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  const checkParams = () => {
    const fullName = inputRefs.current["full-name"].value;
    const email = inputRefs.current["email"].value;
    const contactNumber = inputRefs.current["contact-number"].value;
    const password = inputRefs.current["password"].value;

    if (!fullName || !email || !contactNumber || !password) {
      setError("All fields are required");
      return null;
    }

    return { fullName, email, contactNumber, password };
  };

  const submitHandler = async () => {
    const data = checkParams();

    if (!data) return;
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Sign Up
        </h2>
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
        <div>
          <label
            htmlFor="full-name"
            className="block text-sm font-medium text-yellow-400"
          >
            Full Name
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["full-name"] = el)}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-yellow-400"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["email"] = el)}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="contact-number"
            className="block text-sm font-medium text-yellow-400"
          >
            Contact Number
          </label>
          <input
            id="contact-number"
            name="contact-number"
            type="tel"
            required
            placeholder="Enter your contact number"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["contact-number"] = el)}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-yellow-400"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-3 py-2 mt-1 text-black outline-none bg-gray-700 border border-gray-600 rounded-md focus:ring focus:ring-yellow-400 focus:border-yellow-400"
            ref={(el) => (inputRefs.current["password"] = el)}
          />
        </div>
        <div>
          <button
            className="w-full px-4 py-2 mt-6 font-bold text-black bg-yellow-400 rounded-md hover:bg-yellow-500 focus:ring focus:ring-yellow-400"
            onClick={submitHandler}
          >
            Sign Up
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-yellow-400">OR</span>
          </div>
        </div>
        <div className="mt-6 text-center text-yellow-400">
          <p>
            Already have an account?{" "}
            <Link to="/login" className=" hover:text-yellow-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
