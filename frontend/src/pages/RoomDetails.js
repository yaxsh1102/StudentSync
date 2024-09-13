import React from 'react';
import { Home, User } from 'lucide-react';

// Mock Data for Room Details (this would typically be fetched from an API)
const roomDetails = {
  id: 1,
  buildingName: 'Oceanview Heights',
  personsRequired: 3,
  address: '123 Seaside Blvd, Miami, FL',
  owner: {
    name: 'John Doe',
    contact: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  },
  roomImages: [
    'https://th.bing.com/th/id/OIP.L4wLfL2NIpyVHd1kfRjF-wHaE8?rs=1&pid=ImgDetMain',
  ],
};

const RoomDetails = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col p-8 pl-28">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">{roomDetails.buildingName}</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Room Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roomDetails.roomImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Room ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Room Information</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-white">Building Name:</span> {roomDetails.buildingName}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-white">Persons Required:</span> {roomDetails.personsRequired}
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-white">Address:</span> {roomDetails.address}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Owner Information</h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start space-x-4">
          <User className="text-yellow-400" size={32} />
          <div>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-white">Name:</span> {roomDetails.owner.name}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-white">Contact Email:</span> {roomDetails.owner.contact}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Phone:</span> {roomDetails.owner.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
