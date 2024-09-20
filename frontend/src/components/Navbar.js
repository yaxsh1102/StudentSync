import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const {user} = useContext(AppContext)
  return (
    <div className='w-full h-16 flex items-center bg-gray-800 shadow-lg border-b border-gray-700 pl-20'>
      <p className='text-yellow-400 text-2xl font-semibold pl-6'>Welcome {user.name}</p>
    </div>
  );
}

export default Navbar;
