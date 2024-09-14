import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DormitoryDetails = () => {
  const { showToast } = useContext(AppContext); // Access the showToast function from context

  const dormitory = {
    name: 'Sunshine Dormitory',
    address: '123 Sunshine Street, Gandhinagar, Gujarat',
    capacity: '100 Students',
    price: '₹5,000/month per person',
    description:
      'Sunshine Dormitory offers a comfortable and affordable living space for students. Located in the heart of Gandhinagar, the dormitory is within close proximity to major colleges and universities. Amenities include free Wi-Fi, a shared kitchen, study rooms, and recreational areas. It is the perfect place for students to focus on their studies while also enjoying a vibrant community life.',
    images: [
      'https://th.bing.com/th/id/OIP.L4wLfL2NIpyVHd1kfRjF-wHaE8?rs=1&pid=ImgDetMain',
    ],
    owner: {
      name: 'Mr. Yash Patel',
      phone: '+91 98765 43210',
    },
  };

  // Function to handle the click event and show toast
  const handleAddressClick = () => {
    showToast(`Address: ${dormitory.address}`, 'info');
  };

  return (
    <div className='flex flex-col h-full bg-gray-900 text-white'>
      <div className='fixed top-0 left-0 right-0 z-10 bg-gray-800 '>
        <Navbar />
      </div>

      <div className='flex-1 overflow-y-auto pt-16 md:pt-20 pl-4 md:pl-24 bg-gray-900'>
        <div className='p-4 md:p-8'>
          <h1 className='text-2xl md:text-4xl font-bold mb-4 text-yellow-400'>{dormitory.name}</h1>

          <div className='flex flex-wrap gap-4 md:gap-6'>
            {dormitory.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Dormitory ${index + 1}`}
                className='w-full md:w-1/2 lg:w-1/3 h-48 md:h-64 object-cover rounded-lg border-2 border-yellow-400 shadow-lg'
              />
            ))}
          </div>

          <div className='mt-4 md:mt-6'>
            <p className='text-base md:text-lg'>
              <span className='font-semibold text-yellow-400 cursor-pointer' onClick={handleAddressClick}>
                Address:
              </span> {dormitory.address}
            </p>
            <p className='text-base md:text-lg'>
              <span className='font-semibold text-yellow-400'>Capacity:</span> {dormitory.capacity}
            </p>
            <p className='text-base md:text-lg'>
              <span className='font-semibold text-yellow-400'>Price:</span> {dormitory.price}
            </p>
            <p className='mt-2 md:mt-4 text-gray-300'>{dormitory.description}</p>
          </div>

          <div className='mt-6 md:mt-8'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2 text-yellow-400'>Owner Details</h2>
            <p className='text-base md:text-lg'>
              <span className='font-semibold text-yellow-400'>Name:</span> {dormitory.owner.name}
            </p>
            <p className='text-base md:text-lg'>
              <span className='font-semibold text-yellow-400'>Contact:</span> {dormitory.owner.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormitoryDetails;
