import Navbar from '../components/Navbar';
import { User } from "lucide-react";

// Mock Data for Room Details (this would typically be fetched from an API)
const roomDetails = {
  id: 1,
  buildingName: "Oceanview Heights",
  personsRequired: 3,
  address: "123 Seaside Blvd, Miami, FL",
  owner: {
    name: "John Doe",
    contact: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  },
  roomImages: [
    "https://th.bing.com/th/id/OIP.L4wLfL2NIpyVHd1kfRjF-wHaE8?rs=1&pid=ImgDetMain",
  ],
};

const RoomDetails = () => {
  return (
    <div className='flex flex-col h-full bg-gray-900 text-white'>
      <div className='fixed top-0 left-0 right-0 z-10 bg-gray-800'>
        <Navbar />
      </div>

      <div className='flex-1 overflow-y-auto pt-16 md:pt-20 pl-4 md:pl-24 bg-gray-900'>
        <div className='p-4 md:p-8'>
          <h1 className='text-2xl md:text-4xl font-bold mb-4 text-yellow-400'>
            {roomDetails.buildingName}
          </h1>

          <div className='mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {roomDetails.roomImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room ${index + 1}`}
                  className='w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                />
              ))}
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-2xl font-semibold text-white mb-4'>Room Information</h2>
            <div className='bg-gray-800 p-4 rounded-lg shadow-md'>
              <p className='text-gray-400 mb-2'>
                <span className='font-semibold text-yellow-400'>Building Name:</span> {roomDetails.buildingName}
              </p>
              <p className='text-gray-400 mb-2'>
                <span className='font-semibold text-yellow-400'>Persons Required:</span> {roomDetails.personsRequired}
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
                  <span className='font-semibold text-yellow-400'>Name:</span> {roomDetails.owner.name}
                </p>
                <p className='text-gray-400 mb-2'>
                  <span className='font-semibold text-yellow-400'>Contact Email:</span> {roomDetails.owner.contact}
                </p>
                <p className='text-gray-400'>
                  <span className='font-semibold text-yellow-400'>Phone:</span> {roomDetails.owner.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
