import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { param } = useParams();
  const [event,setEvent]=useState({})

  useEffect(()=>{
    console.log("Inside use effectttt")
    const getEventDetails =async ()=>{
    try{
      const res = await axios.post('http://localhost:8000/api/v1/geteventdetails/',{'id':param}) 

      if (res.data.status===200){
        setEvent(res.data.event)
      }
    }
    catch(err){
      console.log(err)
    }
  }
  getEventDetails()
  },[param])

//   const event = {
//     id: 1,
//     title: "Indigenous Hackathon By DAIICT",
//     image:
//       "https://ieee-dataport.org/sites/default/files/styles/large/public/Hackathonimage_2.png?itok=YNRTjFmz",
//     type: "Hackathon",
//     date: "21/09/2024",
//     time: "9:00 AM - 6:00 PM",
//     venue:
//       "Dhirubhai Ambani Institute of Information and Communication Technology, Gandhinagar, Gujarat",
//     desc: "Join us for an exciting hackathon focused on building innovative solutions for indigenous communities.Join us for an exciting hackathon focused on building innovative solutions for indigenous communities.Join us for an exciting hackathon focused on building innovative solutions for indigenous communities.Join us for an exciting hackathon focused on building innovative solutions for indigenous communities.",
//     organizer: "DAIICT Student Council",
//     capacity: 200,
//     registrationDeadline: "15/09/2024",
//     prizes: [
//       "1st Place : ₹50,000 and Internship Opportunities",
//       "2nd Place : ₹30,000 and Mentorship Program",
//       "3rd Place : ₹20,000 and Tech Gadgets",
//     ],
//     sponsors: [
//       "TechCorp India",
//       "InnovateNow Foundation",
//       "Gujarat Innovation Society",
//     ],
//   };
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-800 ">
        <Navbar />
      </div>

      <div className="flex-1 overflow-y-auto pt-16 md:pt-20 pl-4 md:pl-24 bg-gray-900">
        <div className="p-4 md:p-8 flex items-center justify-center">
          <div className="mb-10 bg-gray-800 p-10 rounded-lg shadow-lg w-9/12">
            <img
              src={`http://localhost:8000${event.image}`}
              alt={event.title}
              className="w-full object-cover rounded-lg mb-10 h-full"
            />
            <h3 className="text-4xl font-bold text-yellow-500 mb-3">
              {event.title}
            </h3>
            <p className="text-gray-400 mb-10">{event.description}</p>
            <button
              type="button"
              className="bg-yellow-500 text-slate-700 font-bold hover:bg-yellow-400 w-40 text-center rounded-lg text-2xl py-2 mb-10"
            >
              Join
            </button>
            <div className="w-full flex items-center space-x-10">
              <p className="text-gray-400 mb-2">
                <strong className="text-white text-xl">Date : </strong>{" "}
                {event.date}
              </p>
              <p className="text-gray-400 mb-2">
                <strong className="text-white text-xl">Time :</strong>{" "}
                {event.time}
              </p>
              <p className="text-gray-400 mb-2">
                <strong className="text-white text-xl">
                  Registration Deadline :
                </strong>{" "}
                {event.deadline}
              </p>
            </div>
            <p className="text-gray-400 mb-10">
              <p className="text-white font-bold text-xl">Venue</p>{" "}
              <p>{event.venue}</p>
            </p>
            <p className="text-gray-400 mb-2">
              <p className="text-white font-bold text-xl mb-3">Prizes</p>
              {event.prizes &&
                event.prizes.split(",").map((prize, index) => (
                  <p key={index} className="mb-2">{prize.trim()}</p>
                ))}
              <p className="mb-10"></p>
            </p>
            <p className="text-gray-400 mb-2">
              <strong className="text-white text-xl">Organizer:</strong>{" "}
              {event.organizer}
            </p>
            <p className="text-gray-400 mb-2">
              <strong className="text-white text-xl">Capacity:</strong>{" "}
              {event.capacity}
            </p>

            <p className="text-gray-400 mb-2">
              <strong className="text-white text-xl">Sponsors:</strong>{" "}
              {event.sponsors}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
