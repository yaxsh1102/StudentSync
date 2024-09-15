import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoom, setUserRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    buildingName: "",
    personsRequired: "",
    roomDetails: "",
    roomPhotos: [],
  });
  const [photoPreview, setPhotoPreview] = useState("");

  const availableRooms = [
    {
      id: 1,
      buildingName: "Sunrise Tower",
      personsRequired: 2,
      address: "123 Main St",
    },
    {
      id: 2,
      buildingName: "Maple Apartments",
      personsRequired: 1,
      address: "456 Maple St",
    },
    {
      id: 3,
      buildingName: "Oceanview Heights",
      personsRequired: 3,
      address: "789 Ocean Ave",
    },
  ];

  const filterRooms = (rooms) =>
    rooms.filter((room) =>
      room.buildingName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormValues({ ...formValues, roomPhotos: [file] });
      setPhotoPreview(preview);
    }
  };

  const handleAddRoom = () => {
    const { buildingName, personsRequired, roomDetails, roomPhotos } =
      formValues;

    if (
      buildingName &&
      personsRequired &&
      roomDetails &&
      roomPhotos.length === 1
    ) {
      const newRoom = {
        id: Date.now(),
        buildingName,
        personsRequired: Number(personsRequired),
        roomDetails,
        roomPhotos,
        address: "Address not provided",
      };
      setUserRoom(newRoom);
      setShowForm(false);
      setFormValues({
        buildingName: "",
        personsRequired: "",
        roomDetails: "",
        roomPhotos: [],
      });
      setPhotoPreview("");
    } else {
      alert("Please fill all fields and upload one photo.");
    }
  };

  const handleDeleteRoom = () => {
    setUserRoom(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col px-8">
      {/* Navbar */}
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
          {!userRoom && (
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
                    name="buildingName"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.buildingName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white">Persons Required</label>
                  <input
                    type="number"
                    name="personsRequired"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.personsRequired}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white">Room Details</label>
                  <textarea
                    name="roomDetails"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                    value={formValues.roomDetails}
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
            {userRoom ? (
              <RoomCard
                buildingName={userRoom.buildingName}
                personsRequired={userRoom.personsRequired}
                address={userRoom.address}
                onDelete={handleDeleteRoom}
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
            {filterRooms(availableRooms).length > 0 ? (
              filterRooms(availableRooms).map((room) => (
                <RoomCard
                  key={room.id}
                  buildingName={room.buildingName}
                  personsRequired={room.personsRequired}
                  address={room.address}
                  onDelete={() => console.log("Room deleted")}
                  isOwned={false}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center mt-4">No rooms found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
