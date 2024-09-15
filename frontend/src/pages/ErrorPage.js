import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-9xl font-bold text-yellow-500">
        {error.status ? error.status : "404"}
      </h1>
      <h2 className="text-3xl mt-4 font-semibold">{error.statusText ? error.statusText : "Page Not Found"}</h2>
      <p className="text-lg mt-2 mb-6 text-gray-400">
        Oops! The page you are looking for doesn't exist.
      </p>
      <p className="text-lg mt-2 mb-6 text-gray-400">{error.data ? error.data : "Error"}</p>
      <div
        className="px-6 py-3 bg-yellow-500 font-bold text-slate-900 rounded-full shadow-lg hover:bg-yellow-300 transition duration-200 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go Back
      </div>
    </div>
  );
};

export default ErrorPage;
