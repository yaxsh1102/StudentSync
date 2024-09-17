import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { User } from "lucide-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Mock Data for Room Details (this would typically be fetched from an API)
// const roomDetails = {
//   id: 1,
//   building_name: "Oceanview Heights",
//   persons_required: 3,
//   address: "123 Seaside Blvd, Miami, FL",
//   owner: {
//     name: "John Doe",
//     contact: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//   },
//   roomImages: [
//     "https://th.bing.com/th/id/OIP.L4wLfL2NIpyVHd1kfRjF-wHaE8?rs=1&pid=ImgDetMain",
//   ],
// };

const RoomDetails = () => {
const{ param} = useParams()
const [roomDetails,setRoomDetails] = useState({})
const [owner,setOwner] = useState({})

useEffect(()=>{
  const getEventDetails =async ()=>{
  try{
    const res = await axios.post('http://localhost:8000/api/v1/getroomdetails/',{'id':param}) 

    if (res.data.status===200){
      setRoomDetails(res.data.event)
      setOwner(res.data.owner)
    }
  }
  catch(err){
    console.log(err)
  }
}
getEventDetails()
},[])

  return (
    <div className='flex flex-col h-full bg-gray-900 text-white'>
      <div className='fixed top-0 left-0 right-0 z-10 bg-gray-800'>
        <Navbar />
      </div>

      <div className='flex-1 overflow-y-auto pt-16 md:pt-20 pl-4 md:pl-24 bg-gray-900'>
        <div className='p-4 md:p-8'>
          <h1 className='text-2xl md:text-4xl font-bold mb-4 text-yellow-400'>
            {roomDetails.building_name}
          </h1>

          <div className='mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <img
                  src={'http://localhost:8000'+roomDetails.image}
                  alt={roomDetails.building_name}
                  className='w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                />
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-white mb-4'>Room Information</h2>
            <div className='bg-gray-800 p-4 rounded-lg shadow-md'>
              <p className='text-gray-400 mb-2'>
                <span className='font-semibold text-yellow-400'>Building Name:</span> {roomDetails.building_name}
              </p>
              <p className='text-gray-400 mb-2'>
                <span className='font-semibold text-yellow-400'>Persons Required:</span> {roomDetails.persons_required}
              </p>
              <p className='text-gray-400 mb-2'>
                <span className='font-semibold text-yellow-400'>Address:</span> {roomDetails.address}
              </p>
            </div>
          </div>

          <div>
            <h2 className='text-2xl font-semibold text-white mb-4'>Owner Information</h2>
            <div className='bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-4'>
              <User className='text-yellow-400' size={32} />
              <div>
                <p className='text-gray-400 mb-2'>
                  <span className='font-semibold text-yellow-400'>Name:</span> {owner.name}
                </p>
                <p className='text-gray-400 mb-2'>
                  <span className='font-semibold text-yellow-400'>Contact Email:</span> {owner.email}
                </p>
                {owner.phone && <p className='text-gray-400'>
                  <span className='font-semibold text-yellow-400'>Phone:</span> {owner.phone}
                </p> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
