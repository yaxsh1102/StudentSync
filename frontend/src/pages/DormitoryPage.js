import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import DormitoryCard from "../components/DormitoryCard";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import axios from "axios";

const DormitoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    address: "",
    capacity: "",
    description: "",
    dormPhoto: null,
  });




  //call your useeffect api here
  const [photoPreview, setPhotoPreview] = useState("");
  const { user,showToast,setRefresher } = useContext(AppContext);
  const [dormitories, setDormitories] = useState({
    userDormitories: [],
    otherDormitories: [],
  });

  useEffect(()=>{
    const getDorms=async()=>{
      try{
        const res = await axios.post("http://localhost:8000/api/v1/getdorms/",{'email':user.email})

        if (res.data.status===200){
          setDormitories({
            userDormitories:res.data.userDormitories,
            otherDormitories:res.data.otherDormitories,
          })
        }else{
          showToast("Couldn't fetch dormitories")
        }
      }catch(err){
        showToast("Some Error occured while fetching dormitories")
      }
    }

    getDorms();
  },[setRefresher])

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
      setFormValues({ ...formValues, dormPhoto: file });
      setPhotoPreview(preview);
    }
  };

  const handleAddDormitory = async () => {
    setShowForm(false)
    const { name, address, capacity, description, dormPhoto } = formValues;

    if (name && address && capacity && description && dormPhoto) {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("name", name);
      formData.append("address", address);
      formData.append("capacity", Number(capacity));
      formData.append("description", description);
      formData.append("image", dormPhoto);


      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/createdorm/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.status === 200) {
          setRefresher('')
          showToast("Dormitory Added")

          setFormValues({
            name: "",
            address: "",
            capacity: "",
            description: "",
            dormPhoto: null,
          })

          const newDormitory = {
            name,
            address,
            capacity: Number(capacity),
            description,
            dormPhoto,
          };

          setDormitories((prevData) => ({
            ...prevData,
            userDormitories: [...prevData.userDormitories, newDormitory],
          }));
        } else {
          console.log("Couldn't send data");
        }
      } catch (err) {
        console.log("Some error occurred");
        console.log(err);
      }
    } else {
      console.log(formValues);
      alert("Please fill all fields and upload one photo.");
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit dormitory with id: ${id}`);
  };

  const handleDelete = async (id) => {
    // setDormitories((prevData) => ({
    //   ...prevData,
    //   userDormitories: prevData.userDormitories.filter((dorm) => dorm.id !== id),
    // }));
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/deletedorm/`,{'id':id});
  
      if (res.data.status === 200) {
        console.log(`Dormitory with id ${id} deleted successfully`);
        showToast("Dormitory deleted successfully !")
  
        setDormitories((prevData) => ({
          ...prevData,
          userDormitories: prevData.userDormitories.filter((dorm) => dorm.id !== id),
        }));
      } else {
        console.log("Failed to delete dormitory");
      }
    } catch (err) {
      console.log("Error occurred while deleting dormitory");
      console.log(err);
    }
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
              <label className="block text-white">Description</label>
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
        {filterDormitories(dormitories.userDormitories).length > 0 ? (
          filterDormitories(dormitories.userDormitories).map((dorm) => (
            <DormitoryCard
              key={dorm.id}
              {...dorm}
              isOwned={true}
              onEdit={() => handleEdit(dorm.id)}
              onDelete={() => handleDelete(dorm.id)}
            />
          ))
        ) : (
          <p className="text-white">No dormitories found.</p>
        )}

        <h2 className="text-xl font-bold text-white mb-4">Other Dormitories</h2>
        {filterDormitories(dormitories.otherDormitories).length > 0 ? (
          filterDormitories(dormitories.otherDormitories).map((dorm) => (
            <DormitoryCard key={dorm.id} {...dorm} />
          ))
        ) : (
          <p className="text-white">No dormitories found.</p>
        )}
      </div>
    </div>
  );
};

export default DormitoryPage;
