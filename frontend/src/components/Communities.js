import React, { useState } from "react";
import { Search, Plus, Home, Edit, Trash2 } from "lucide-react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import DormitoryCard from "../components/DormitoryCard";

const Communities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    
  });
  const [photoPreview, setPhotoPreview] = useState("");

  const userOwnedDormitories = [
    {
      id: 1,
      name: "My Sunshine Hall",
      address: "123 Campus Drive",
      capacity: 200,
      description: "A bright and sunny hall.",
    },
    {
      id: 2,
      name: "My Moonlight Dorm",
      address: "456 University Ave",
      capacity: 150,
      description: "A cozy dorm under the moonlight.",
    },
  ];

  const otherDormitories = [
    {
      id: 3,
      name: "Starlight Residence",
      address: "789 College Blvd",
      capacity: 180,
      description: "A residence with starlit views.",
    },
    {
      id: 4,
      name: "Pine View Dorm",
      address: "101 Forest Lane",
      capacity: 120,
      description: "A peaceful dorm with a pine view.",
    },
    {
      id: 5,
      name: "Riverside Hall",
      address: "202 River Road",
      capacity: 160,
      description: "A hall by the riverside.",
    },
  ];

  const filterDormitories = (dormitories) =>
    dormitories.filter((dorm) =>
      dorm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormValues({ ...formValues, dormPhotos: [file] });
      setPhotoPreview(preview);
    }
  };

  const handleAddDormitory = () => {
    const { name, address, capacity, description, dormPhotos } = formValues;

    if (name && address && capacity && description && dormPhotos.length === 1) {
      const newDormitory = {
        id: Date.now(),
        name,
        address,
        capacity: Number(capacity),
        description,
        dormPhotos,
      };
      console.log("New dormitory added:", newDormitory);
      setShowForm(false);
      setFormValues({
        name: "",
        address: "",
        capacity: "",
        description: "",
        dormPhotos: [],
      });
      setPhotoPreview("");
    } else {
      alert("Please fill all fields and upload one photo.");
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit dormitory with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete dormitory with id: ${id}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col pl-24">
      <div className="bg-gray-900 pt-4 flex justify-between items-center px-4 ">
        <h1 className="text-2xl font-bold text-white">Dormitory Manager</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search dormitories..."
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
            Add Dormitory
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 w-[100%] mx-auto z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">
              Add a New Dormitory
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
              <label className="block text-white">Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Address</label>
              <input
                type="text"
                name="address"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Capacity</label>
              <input
                type="number"
                name="capacity"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.capacity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Description</label>{" "}
              {/* Added description field */}
              <textarea
                name="description"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.description}
                onChange={handleInputChange}
                rows="3"
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
              onClick={handleAddDormitory}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg w-full"
            >
              Add Dormitory
            </button>
          </form>
        </div>
      )}

      <div className="flex-grow p-4 pt-8">
        <h2 className="text-xl font-bold text-white mb-4">Your Dormitories</h2>
        {filterDormitories(userOwnedDormitories).map((dorm) => (
          <DormitoryCard
            key={dorm.id}
            {...dorm}
            isOwned={true}
            onEdit={() => handleEdit(dorm.id)}
            onDelete={() => handleDelete(dorm.id)}
          />
        ))}

        <h2 className="text-xl font-bold text-white mb-4">Other Dormitories</h2>
        {filterDormitories(otherDormitories).map((dorm) => (
          <DormitoryCard key={dorm.id} {...dorm} isOwned={false} />
        ))}
      </div>
    </div>
  );
};

export default Communities;
