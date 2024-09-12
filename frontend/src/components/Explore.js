import React from 'react';

const Explore = () => {
  const events = [
    {
      title: "Indigenous Hackathon By DAIICT",
      image:"" ,
      type: "Hackathon",
      date: "21/09/2004",
      venue: "Gandhinagar, Gujarat",
      desc: "This hackathon is organized by DAIICT and focuses on building innovative solutions for indigenous communities. Participants"
    },
    {
      title: "Indigenous Hackathon By DAIICT",
      type: "Hackathon",
      date: "21/09/2004",
      venue: "Gandhinagar, Gujarat",
      desc: "This hackathon is organized by DAIICT and focuses on building innovative solutions for indigenous communities. Participants"
    }
  ];

  const community = [
    {
      name: "Python Community",
      image:"" ,
      members: "20000",
      desc: "This hackathon is organized by DAIICT and focuses on building innovative solutions for indigenous communities. Participants" ,
      type:"Pyhton"
    },
    {
        name: "Chillout Community",
        image:"" ,
        members: "20000",
        desc: "This hackathon is organized by DAIICT and focuses on building innovative solutions for indigenous communities. Participants" ,
        type:"Chillout"
    }
  ];

  return (
    <div className='w-full h-screen flex flex-col'>
    <div className='w-full text-white h-16 flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md'>
      <p className='text-white text-2xl font-semibold pl-6'>Welcome Yash</p>
    </div>

    <div className='flex-1 overflow-y-auto' style={{ height: 'calc(100vh - 4rem)' }}>
      <div className='mt-6 px-6'>
        <p className='text-black text-xl font-bold mb-4'>Events For You</p>

        {events.map((event, index) => (
          <div key={index} className='h-[180px] bg-slate-100 shadow-md shadow-gray-300 rounded-lg p-4 mb-4'>
            <div className='flex w-full justify-start gap-x-6 items-center'>
              <img
                src="https://th.bing.com/th/id/OIP._D1d2TEmPIdlP6Y7HuT7qwHaEX?rs=1&pid=ImgDetMain"
                alt='Event'
                className='w-24 h-24 object-cover rounded-lg shadow-md transition-transform hover:scale-105 duration-300 ease-in-out sm:block hidden'
              />

              <div className='flex flex-col justify-between flex-1'>
                <p className='text-lg text-indigo-600 font-bold'>{event.title}</p>

                <div className='flex gap-x-3 mt-2 items-center'>
                  <p className='px-3 py-0.5 text-xs bg-gray-200 rounded-full border border-gray-300 text-gray-700'>{event.type}</p>
                  <p className='text-gray-500 text-xs'>{event.date}</p>
                </div>

                <p className='mt-2 text-gray-600 text-xs'>
                  <span className='font-medium'>Venue: </span>{event.venue}
                </p>

                <p className='mt-3 text-gray-700 text-sm leading-relaxed hidden md:block'>
                  {event.desc.substring(0, 120)}... <span className='text-indigo-500 text-xs'>Read More</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-6 px-6'>
        <p className='text-black text-xl font-bold mb-4'>Communities For You</p>

        {community.map((commun , index) => (
          <div key={index} className='h-[180px] bg-slate-100 shadow-md shadow-gray-300 rounded-lg p-4 mb-4'>
            <div className='flex w-full justify-start gap-x-6 items-center'>
              <img
                src="https://th.bing.com/th/id/OIP._D1d2TEmPIdlP6Y7HuT7qwHaEX?rs=1&pid=ImgDetMain"
                alt='Event'
                className='w-24 h-24 object-cover rounded-lg shadow-md transition-transform hover:scale-105 duration-300 ease-in-out sm:block hidden'
              />

              <div className='flex flex-col justify-between flex-1'>
                <p className='text-lg text-indigo-600 font-bold'>{commun.name}</p>

                <div className='flex gap-x-3 mt-2 items-center'>
                  <p className='px-3 py-0.5 text-xs bg-gray-200 rounded-full border border-gray-300 text-gray-700'>{commun.type}</p>
                  {/* <p className='text-gray-500 text-xs'>{event.date}</p> */}
                </div>

                <p className='mt-2 text-gray-600 text-xs'>
                  <span className='font-medium'>Members: </span>{commun.members}
                </p>

                <p className='mt-3 text-gray-700 text-sm leading-relaxed hidden md:block'>
                  {commun.desc.substring(0, 120)}... <span className='text-indigo-500 text-xs'>Read More</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
;

export default Explore;