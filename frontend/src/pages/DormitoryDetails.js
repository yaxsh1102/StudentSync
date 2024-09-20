import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const DormitoryDetails = () => {
  const { showToast,loader,setLoader } = useContext(AppContext); 
  const {param} = useParams();
  const [dormitory,setDormitory]= useState({})
  const [owner,setOwner]= useState({})

  useEffect(()=>{
    const getDormDetails =async ()=>{
      setLoader(true)
      try{
        const res = await axios.post(`http://localhost:8000/api/v1/getdormdetails/`,{'id':param})

        if (res.data.status===200){
          setDormitory(res.data.dormitory)
          setOwner(res.data.owner)
          setLoader(false)
        }else{
          showToast("Couldn't fetch dorm details");
        }
      }catch(err){
        showToast('Error fetching dorm details'+err);
      }
    }
    getDormDetails();
  },[param])

  const handleAddressClick = () => {
    showToast(`Address: ${dormitory.address}`, 'info');
  };

  if (loader){
    return(<Loading/>)
  }

  return (
    <div className='flex flex-col h-full bg-gray-900 text-white'>
      <div className='fixed top-0 left-0 right-0 z-10 bg-gray-800 '>
        <Navbar />
      </div>

      <div className='flex-1 overflow-y-auto pt-16 md:pt-20 pl-4 md:pl-24 bg-gray-900'>
        <div className='p-4 md:p-8'>
          <h1 className='text-2xl md:text-4xl font-bold mb-4 text-yellow-400'>{dormitory.name}</h1>

          <div className='flex flex-wrap gap-4 md:gap-6'>
              <img
                src={"http://localhost:8000/"+dormitory.image}
                alt={`Dormitory ${dormitory.id }`}
                className='w-full md:w-1/2 lg:w-1/3 h-48 md:h-64 object-cover rounded-lg border-2 border-yellow-400 shadow-lg'
              />
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
              <span className='font-semibold text-yellow-400'>Name:</span><Link className='hover:underline hover:text-slate-100' to={`/profile/${owner.id}`} > {owner.name}</Link>
            </p>
            <p className='text-base md:text-lg'>
              <span className='font-semibold text-yellow-400'>Contact:</span> {owner.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormitoryDetails;
