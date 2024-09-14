import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar"; // Make sure to import Sidebar
import LandingPage from "./LandingPage";
import Footer from "../components/Footer";
import Loading from "../components/Loading"

const ErrorPage = lazy(() => import("./ErrorPage"));
const Login = lazy(() => import("./Login"));
const Profile = lazy(() => import("./Profile"));
const Signup = lazy(() => import("./Signup"));
const Rooms = lazy(() => import("./Rooms"));
const DormitoryPage = lazy(() => import("./DormitoryPage"));
const DormitoryDetails = lazy(() => import("./DormitoryDetails"));
const Communities = lazy(() => import("../components/Communities"));
const CommunityChatPage = lazy(() => import("../components/CommunityChatPage"));
const Events = lazy(() => import("./Events"));
const EventDetails = lazy(() => import("./EventDetails"));
const RoomDetails = lazy(() => import("./RoomDetails"));

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
        element: <LandingPage />,
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
        path: "/events",
        element: (
          <Suspense fallback={<Loading />}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: "/eventDetails",
        element: (
          <Suspense fallback={<Loading />}>
            <EventDetails />
          </Suspense>
        ),
      },
      {
        path: "/communities",
        element: (
          <Suspense fallback={<Loading />}>
            <Communities />
          </Suspense>
        ),
      },
      {
        path: "/community",
        element: (
          <Suspense fallback={<Loading />}>
            <CommunityChatPage />
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