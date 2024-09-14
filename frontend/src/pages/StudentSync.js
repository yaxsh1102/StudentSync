import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../components/Home";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from './Rooms';
import DormitoryPage from './DormitoryPage';
import DormitoryDetails from './DormitoryDetails';
import RoomDetails from './RoomDetails';
import Sidebar from "../components/Sidebar"; // Make sure to import Sidebar

const LandingPage = lazy(() => import("./LandingPage"));
const Footer = lazy(() => import("../components/Footer"));
const Loading = lazy(() => import("../components/Loading"));
const ErrorPage = lazy(() => import("./ErrorPage"));

const StudentSync = () => {
  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <StudentSync />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/rooms",
        element: (
          <Suspense fallback={<Loading />}>
            <Rooms />
          </Suspense>
        ),
      },
      {
        path: "/dormitory",
        element: (
          <Suspense fallback={<Loading />}>
            <DormitoryPage />
          </Suspense>
        ),
      },
      {
        path: "/dormitoryDetails",
        element: (
          <Suspense fallback={<Loading />}>
            <DormitoryDetails />
          </Suspense>
        ),
      },
      {
        path: "/roomDetails",
        element: (
          <Suspense fallback={<Loading />}>
            <RoomDetails />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default StudentSync;