import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  Share2,
} from "lucide-react";
import Navbar from "../components/Navbar";


const EventPage = () => {
  return (
    <div className="min-h-screen bg-black text-white  justify-center items-center  overflow-hidden flex flex-col">
      <Navbar></Navbar>
      <div className="pl-20">
        <div className="max-w-2xl w-full bg-gray-900 rounded-lg shadow-lg ">
          <header className="bg-yellow-500 text-black rounded-t-lg">
            <div className="px-4 py-4 sm:px-6 sm:py-6">
              <h1 className="text-xl sm:text-2xl font-bold">{event.title}</h1>
              <p className="text-yellow-700 mt-1 text-sm sm:text-base">
                {event.type}
              </p>
            </div>
          </header>

          <main className="p-4 sm:p-6">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 sm:h-52 object-cover mb-4 rounded-lg"
            />

            <div className="flex flex-wrap gap-2 mb-4 text-xs sm:text-sm text-yellow-400">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {event.date}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {event.time}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {event.venue}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Capacity: {event.capacity} participants
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-yellow-300 mb-3">
              About the Event
            </h2>
            <p className="text-white text-xs sm:text-sm mb-5">{event.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  Event Details
                </h3>
                <ul className="space-y-1 text-xs sm:text-sm">
                  <li>
                    <strong>Organizer:</strong> {event.organizer}
                  </li>
                  <li>
                    <strong>Registration Deadline:</strong>{" "}
                    {event.registrationDeadline}
                  </li>
                  <li>
                    <strong>Sponsors:</strong> {event.sponsors.join(", ")}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  Prizes
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
                  {event.prizes.map((prize, index) => (
                    <li key={index}>{prize}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-yellow-300 mb-3">
              Rules and Regulations
            </h2>
            <ul className="list-disc pl-4 space-y-1 mb-6 text-xs sm:text-sm text-white">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                Register Now
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center text-xs sm:text-sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Event
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
