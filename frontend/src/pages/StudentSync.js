import React, { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate ,Outlet} from "react-router-dom";
import Home from "../components/Home";
import Sidebar from "../components/Sidebar";
import LandingPage from "./LandingPage";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import EditProfile from "../components/EditProfile";
import useGetUser from "../hooks/useGetUser";
import { AppContext } from "../context/AppContext";

// const ErrorPage = lazy(() => import("./ErrorPage"));
const Login = lazy(() => import("./Login"));
const Profile = lazy(() => import("../components/Profile"));
const Signup = lazy(() => import("./Signup"));
const Rooms = lazy(() => import("./Rooms"));
const DormitoryPage = lazy(() => import("./DormitoryPage"));
const DormitoryDetails = lazy(() => import("./DormitoryDetails"));
const Communities = lazy(() => import("../components/Communities"));
const Chat = lazy(() => import("../components/Chat"));
const Events = lazy(() => import("./Events"));
const EventDetails = lazy(() => import("./EventDetails"));
const RoomDetails = lazy(() => import("./RoomDetails"));

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};


const StudentSync = () => {

  useGetUser();
  const {isLoggedIn} = useContext(AppContext)

  return (
    <>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<LandingPage />} />
                <Route path="home" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
                <Route path="profile/:param" element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />
                <Route path="edit-profile/:param" element={<Suspense fallback={<Loading />}><EditProfile /></Suspense>} />
                <Route path="events" element={<Suspense fallback={<Loading />}><Events /></Suspense>} />
                <Route path="eventDetails/:param" element={<Suspense fallback={<Loading />}><EventDetails /></Suspense>} />
                <Route path="communities" element={<Suspense fallback={<Loading />}><Communities /></Suspense>} />
                <Route path="chat" element={<Suspense fallback={<Loading />}><Chat /></Suspense>} />
                <Route path="rooms" element={<Suspense fallback={<Loading />}><Rooms /></Suspense>} />
                <Route path="dormitory" element={<Suspense fallback={<Loading />}><DormitoryPage /></Suspense>} />
                <Route path="dormitoryDetails/:param" element={<Suspense fallback={<Loading />}><DormitoryDetails /></Suspense>} />
                <Route path="roomDetails/:param" element={<Suspense fallback={<Loading />}><RoomDetails /></Suspense>} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
              <Route path="/signup" element={<Suspense fallback={<Loading />}><Signup /></Suspense>} />
              {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default StudentSync;
