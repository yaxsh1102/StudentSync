import React, { useContext, useEffect, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import RoomCard from "../components/RoomCard";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "../components/Loading";

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    building_name: "",
    persons_required: "",
    details: "",
    image: [],
    address:'',
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const {user,showToast,setRefresher,loader,setLoader} = useContext(AppContext) ;
  const [roomsData, setRoomsData] = useState({userRoom:'',availableRooms:[]})

  useEffect(()=>{
    const getRooms=async()=>{
      setLoader(true)
      try{
        const res = await axios.post('http://localhost:8000/api/v1/getrooms/',{'email':user.email})

        if (res.data.status===200){
          setRoomsData({
            userRoom:res.data.userRoom,
            availableRooms:res.data.availableRooms,
          })
          console.log(res.data.availableRooms[0].building_name)
          setLoader(false)
        }
        else{
          console.log("error fetching rooms")
        }
      }catch(err){
        console.log("Error while Fetching Rooms : "+err)
      }
    }
    getRooms();
  },[setRefresher])

  const filterRooms = (rooms) =>
    rooms.filter((room) =>
      room.address.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddRoom = async () => {
    const { building_name, persons_required, details, image , address } =
      formValues;

    if (
      building_name &&
      persons_required &&
      details &&
      address &&
      image
    ) {
      const newRoom = {
        id: Date.now(),
        email:user.email,
        building_name:building_name,
        persons_required: Number(persons_required),
        details:details,
        image:image,
        address:address
      };// edited data according to backend


      try{
        setLoader(true)
        const res = await axios.post('http://localhost:8000/api/v1/createroom/',newRoom,{
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })

        if (res.data.status===200){
          setRefresher('')
          showToast("Room Added !")
          setShowForm(false);
          setFormValues({
            building_name: "",
            persons_required: "",
            details: "",
            image: [],
          });
          setPhotoPreview("");
          setLoader(false)
        }
        else{
          showToast("Error Occured while Adding room ")
        }
      }
      catch(err){
        showToast("Some Error Occured while Adding room ")
      }

      setRoomsData((prevState) => ({
        userRoom: newRoom,
        // availableRooms: [...prevState.availableRooms, newRoom],
      }));

      
    } else {
      console.log(formValues)
      alert("Please fill all fields and upload one photo.");
    }
  };

  const handleDeleteRoom = async() => {

    try{
      const res = await axios.post('http://localhost:8000/api/v1/deleteroom/',{'email':user.email})

      if (res.data.status===200){
        setRoomsData((prevState) => ({
          ...prevState,
          userRoom: null,
        }));
        showToast("Room Deleted Successfully !")
      }
      else{
        console.log("error deleting room")
      }
    }catch(err){
      console.log("Error while Deleting Room : "+err)
    }
  };

  if (loader){
    return(<Loading/>)
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col px-8">
      <div className="bg-gray-900 p-4 flex justify-between items-center pl-24">
        <h1 className="text-2xl font-bold text-white">Find Roommates</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for rooms..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          {!roomsData.userRoom && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
            >
              <Plus size={20} className="mr-2" />
              Add New Room
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pl-24">
        <div className="grid grid-cols-1 gap-8 mt-6">
          {showForm && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold text-white mb-4">
                Add a New Room
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-white">Building Name</label>
                  <input
                    type="text"
                    name="building_name"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.building_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white">Persons Required</label>
                  <input
                    type="number"
                    name="persons_required"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.persons_required}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white">Room Details</label>
                  <textarea
                    name="details"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.details}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white">Room Address</label>
                  <textarea
                    name="address"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.address}
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

                <button
                  type="button"
                  onClick={handleAddRoom}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg"
                >
                  Add Room
                </button>
              </form>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Room
            </h2>
            {roomsData.userRoom ? (
              <RoomCard
                id={roomsData.userRoom.id}
                building_name={roomsData.userRoom.building_name}
                persons_required={roomsData.userRoom.persons_required}
                address={roomsData.userRoom.address}
                onDelete={() => handleDeleteRoom()}
                isOwned={true}
              />
            ) : (
              <p className="text-gray-400 text-center mt-4">
                You haven't added a room yet.
              </p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Available Rooms
            </h2>
            {filterRooms(roomsData.availableRooms).length > 0 ? (
              filterRooms(roomsData.availableRooms).map((room) => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  building_name={room.building_name}
                  persons_required={room.persons_required}
                  address={room.address}
                  isOwned={false}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center">
                No rooms available for the search term.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
