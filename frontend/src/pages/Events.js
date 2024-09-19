import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Search, Plus, Home, Edit, Trash2Icon } from "lucide-react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'

import { AppContext } from "../context/AppContext";


const Events = () => {
  const [eventsData,setEventsData] =useState({userEvents:[],upcoming:[],live:[],past:[]})
  const {user,setRefresher} = useContext(AppContext) ;

  useEffect(()=>{
    const getEvents = async ()=>{
      try {
        const res = await axios.post('http://localhost:8000/api/v1/events/',{'email':user.email})
        
        if (res.data.status===200){
          console.log(res.data)
          setEventsData({ 
            userEvents:res.data.userEvents,
            upcoming:res.data.upcoming,
            live:res.data.live,
            past:res.data.past
            
          })
        }
      }
      catch(err){
        console.log("Some error hehe")
      }
    }
    getEvents()
  },[setRefresher])

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    image: "",
    type: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    organizer: "",
    capacity: "",
    registrationDeadline: "",
    prizes:'',
    sponsors: "",
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const formData = new FormData()  ;
  formData.append("user", JSON.stringify(user)); 

  const filteredEvents = (events) =>
    events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormValues({ ...formValues, image: file });
      setPhotoPreview(preview);
    }
  };

  const handleCreateEvent = async () => {
    const {
      title,
      image,
      type,
      date,
      time,
      venue,
      description,
      organizer,
      capacity,
      registrationDeadline,
      prizes,
      sponsors,
    } = formValues;

    if (
      title &&
      image &&
      type &&
      date &&
      time &&
      venue &&
      description &&
      organizer &&
      capacity &&
      registrationDeadline &&
      prizes &&
      sponsors
    ) {
      const newEvent = {
        email:user.email,
        title:title,
        image:image,
        type:type,
        date:date,
        time:time,
        venue:venue,
        description:description,
        organizer:organizer,
        capacity: Number(capacity),
        deadline:registrationDeadline,
        prizes:prizes,
        sponsors:sponsors,
      };



      for (const key in newEvent) {
        if (newEvent.hasOwnProperty(key)) {
          formData.append(key, newEvent[key]);
        }
      }


      console.log("New Event added:", newEvent);

      try{
        const res = await axios.post('http://localhost:8000/api/v1/createevent/', newEvent,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })

        if (res.data.status===200){
          setRefresher('')
          setShowForm(false)

          setEventsData((prevData) => ({
            ...prevData,
            userEvents: [...prevData.userEvents, newEvent],
          }));  
          }else{
          console.log("Couldn't send data ")
        }
      }
      catch(err){
        console.log("Some error occured")
        console.log(err)
      }
      setShowForm(false)

    } else {
      console.log(formValues)
      alert("Please fill all fields and upload one photo.");
    }
  };


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col pl-24 px-8">
      <div className="bg-gray-900 pt-4 flex justify-between items-center px-8">
        <h1 className="text-2xl font-bold text-white">Events</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
          >
            <Plus size={20} className="mr-2" />
            Create Event
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md m-6 w-[100%] mx-auto z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">
              Create a New Event
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-red-400 hover:text-red-300"
            >
              <IoClose size={24} />
            </button>
          </div>
          <form className="space-y-4 w-full mx-auto">
            <div>
              <label className="block text-white">Title</label>
              <input
                type="text"
                name="title"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex gap-4 pb-4">
              <div className="relative w-24 h-24 border border-gray-500 flex justify-center items-center">
                <label htmlFor="img-upload" className="cursor-pointer">
                  <MdOutlineAddAPhoto className="text-white" size={24} />
                </label>
                <input
                  type="file"
                  id="img-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="absolute inset-0 object-cover w-full h-full rounded-md"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-white">Event Type</label>
              <input
                name="type"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Date</label>{" "}
              <input
                type="date"
                name="date"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Time</label>{" "}
              <input
                type="time"
                name="time"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Venue</label>{" "}
              <textarea
                name="venue"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.venue}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-white">Description</label>{" "}
              <textarea
                name="description"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-white">Organizer</label>{" "}
              <input
                type="text"
                name="organizer"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.organizer}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Capacity</label>{" "}
              <input
                type="text"
                name="capacity"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Registration Deadline</label>{" "}
              <input
                type="date"
                name="registrationDeadline"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.registrationDeadline}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Prizes</label>{" "}
              <input
                type="text"
                name="prizes"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.prizes}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Sponsors</label>{" "}
              <input
                type="text"
                name="sponsors"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.sponsors}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleCreateEvent}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg w-full"
            >
              Create Event
            </button>
          </form>
        </div>
      )}

      {/* User Events */}
      <div className="my-16 mx-8">
        <h2 className="text-3xl font-bold mb-8 text-white">My Events</h2>
        <div className="flex items-center justify-start space-x-3 flex-wrap">
          {eventsData.userEvents.length > 0 ? (
            filteredEvents(eventsData.userEvents)?.map((event) => (
              <Link
                to={`/eventDetails/${event.id}`}
                className="mb-10 bg-gray-800 w-[23.5rem] h-[27rem] overflow-hidden rounded-lg shadow-lg cursor-pointer"
                >

                <img
                  src={`http://localhost:8000${event.image}`}
                  alt={event.title}
                  className="w-full h-52 object-cover rounded-t-lg"
                  />
                 
                <div className="p-3 text-wrap">
                  <h3 className="text-xl font-extrabold text-yellow-500 mb-2">
                    {event.title.substring(0, 31).length <= event.title.length
                      ? event.title
                      : event.title.substring(0, 31) + "..."}
                  </h3>
                  <div className="flex items-center justify-between text-base">
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Time:</strong> {event.time}
                    </p>
                  </div>
                  <p className="text-gray-400 mb-1">
                    <strong>Venue:</strong>{" "}
                    {event.venue.substring(0, 85).length <= event.title.length
                      ? event.venue
                      : event.venue.substring(0, 85) + "..."}
                  </p>
                  <p className="text-white mb-1">
                    {event.organizer.substring(0, 85).length <=
                    event.title.length
                      ? event.organizer
                      : event.organizer.substring(0, 85) + "..."}
                  </p>
                  <p className="text-gray-400 mb-1 flex items-center justify-between">
                    <div className="flex space-x-1 items-center justify-center">
                      <FaRegClock />
                      <div className="font-extrabold">
                        {event.deadline}
                      </div>
                    </div>
                  </p>
                </div>
               </Link>
            ))
          ) : (
            <p className="text-gray-400 w-full text-lg text-center m-5">
              You haven't added a room yet.
            </p>
          )}
          ;
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="my-16 mx-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Upcoming Events</h2>
        <div className="flex items-center justify-start space-x-3 flex-wrap">
          {eventsData.upcoming.length > 0 ? (
            filteredEvents(eventsData.upcoming)?.map((event) => (
              <Link
              to={`/eventDetails/${event.id}`}
                key={event.id}
                className="mb-10 bg-gray-800 w-[23.5rem] h-[27rem] overflow-hidden rounded-lg shadow-lg cursor-pointer"
              >
                <img
                  src={`http://localhost:8000${event.image}`}
                  alt={event.title}
                  className="w-full h-52 object-cover rounded-t-lg"
                />
                <div className="p-3 text-wrap">
                  <h3 className="text-xl font-extrabold text-yellow-500 mb-2">
                    {event.title.substring(0, 31).length <= event.title.length
                      ? event.title
                      : event.title.substring(0, 31) + "..."}
                  </h3>
                  <div className="flex items-center justify-between text-base">
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Time:</strong> {event.time}
                    </p>
                  </div>
                  <p className="text-gray-400 mb-1">
                    <strong>Venue:</strong>{" "}
                    {event.venue.substring(0, 85).length <= event.title.length
                      ? event.venue
                      : event.venue.substring(0, 85) + "..."}
                  </p>
                  <p className="text-white mb-1">
                    {event.organizer.substring(0, 85).length <=
                    event.title.length
                      ? event.organizer
                      : event.organizer.substring(0, 85) + "..."}
                  </p>
                  <p className="text-gray-400 mb-1 flex items-center justify-between">
                    <div className="flex space-x-1 items-center justify-center">
                      <FaRegClock />
                      <div className="font-extrabold">
                        {event.registrationDeadline - Date.now()} days left
                      </div>
                    </div>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 w-full text-lg text-center m-5">
              No upcoming events found.
            </p>
          )}
          ;
        </div>
      </div>
      {/* Live Events */}
      <div className="my-16 mx-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Live Events</h2>
        <div className="flex items-center justify-start space-x-3 flex-wrap">
          {eventsData.live.length > 0 ? (
            filteredEvents(eventsData.live)?.map((event) => (
              <Link
              to={`/eventDetails/${event.id}`}
                key={event.id}
                className="mb-10 bg-gray-800 w-[23.5rem] h-[27rem] overflow-hidden rounded-lg shadow-lg cursor-pointer"

              >
                <img
                  src={`http://localhost:8000${event.image}`}
                  alt={event.title}
                  className="w-full h-52 object-cover rounded-t-lg"
                />
                <div className="p-3 text-wrap">
                  <h3 className="text-xl font-extrabold text-yellow-500 mb-2">
                    {event.title.substring(0, 31).length <= event.title.length
                      ? event.title
                      : event.title.substring(0, 31) + "..."}
                  </h3>
                  <div className="flex items-center justify-between text-base">
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Time:</strong> {event.time}
                    </p>
                  </div>
                  <p className="text-gray-400 mb-1">
                    <strong>Venue:</strong>{" "}
                    {event.venue.substring(0, 85).length <= event.title.length
                      ? event.venue
                      : event.venue.substring(0, 85) + "..."}
                  </p>
                  <p className="text-white mb-1">
                    {event.organizer.substring(0, 85).length <=
                    event.title.length
                      ? event.organizer
                      : event.organizer.substring(0, 85) + "..."}
                  </p>
                  <p className="text-gray-400 mb-1 flex items-center justify-between">
                    <div className="flex space-x-1 items-center justify-center">
                      <FaRegClock />
                      <div className="font-extrabold">
                        {event.deadline}
                      </div>
                    </div>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 w-full text-lg text-center m-5">
              You haven't added a room yet.
            </p>
          )}
          ;
        </div>
      </div>
      {/* Past Events */}
      <div className="my-16 mx-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Past Events</h2>
        <div className="flex items-center justify-start space-x-3 flex-wrap">
          {eventsData.past.length > 0 ? (
            filteredEvents(eventsData.past)?.map((event) => (
              <Link
              to={`/eventDetails/${event.id}`}
                key={event.id}
                className="mb-10 bg-gray-800 w-[23.5rem] h-[27rem] overflow-hidden rounded-lg shadow-lg cursor-pointer"

              >
                <img
                  src={`http://localhost:8000${event.image}`}
                  alt={event.title}
                  className="w-full h-52 object-cover rounded-t-lg"
                />
                <div className="p-3 text-wrap">
                  <h3 className="text-xl font-extrabold text-yellow-500 mb-2">
                    {event.title.substring(0, 31).length <= event.title.length
                      ? event.title
                      : event.title.substring(0, 31) + "..."}
                  </h3>
                  <div className="flex items-center justify-between text-base">
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-400 mb-1 font-bold">
                      <strong>Time:</strong> {event.time}
                    </p>
                  </div>
                  <p className="text-gray-400 mb-1">
                    <strong>Venue:</strong>{" "}
                    {event.venue.substring(0, 85).length <= event.title.length
                      ? event.venue
                      : event.venue.substring(0, 85) + "..."}
                  </p>
                  <p className="text-white mb-1">
                    {event.organizer.substring(0, 85).length <=
                    event.title.length
                      ? event.organizer
                      : event.organizer.substring(0, 85) + "..."}
                  </p>
                  <p className="text-gray-400 mb-1 flex items-center justify-between">
                    <div className="flex space-x-1 items-center justify-center">
                      <FaRegClock />
                      <div className="font-extrabold">
                        {event.deadline}
                      </div>
                    </div>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 w-full text-lg text-center m-5">
              You haven't added a room yet.
            </p>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default Events;