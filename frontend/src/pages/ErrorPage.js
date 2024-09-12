import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
      <h1 className="text-9xl font-bold text-yellow-500">{error.status}</h1>
      <h2 className="text-3xl mt-4 font-semibold">Page Not Found</h2>
      <p className="text-lg mt-2 mb-6 text-gray-400">
        Oops! The page you are looking for doesn't exist.
      </p>
      <button
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-lg hover:bg-yellow-400 transition duration-300"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
