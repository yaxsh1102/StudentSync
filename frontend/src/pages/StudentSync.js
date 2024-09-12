import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../components/Home";
import Profile from "./Profile";

const LandingPage = lazy(() => import("./LandingPage"));
const Footer = lazy(() => import("../components/Footer"));
const Loading = lazy(() => import("../components/Loading"));
const ErrorPage = lazy(() => import("./ErrorPage"));

const StudentSync = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <Outlet />
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
      
    ],
    errorElement: <ErrorPage />,
  },
]);

export default StudentSync;
