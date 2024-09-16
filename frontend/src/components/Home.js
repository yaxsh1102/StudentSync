import React from "react";
import Explore from "./Explore";
import useGetUser from "../hooks/useGetUser";

const Home = () => {
  useGetUser();
  return (
    <div className="min-h-screen pl-20">
      <Explore />
    </div>
  );
};

export default Home;
