import { Search, Plus, Home, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const RoomCard = ({ buildingName, personsRequired, address, onDelete, isOwned }) => {
    const navigate = useNavigate()
    return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 cursor-pointer" >
      <div className="flex justify-between items-start mb-2">
        <Home className="text-yellow-400" size={24} />
        {isOwned && (
          <div className="flex space-x-2">
            <button onClick={onDelete} className="text-red-400 hover:text-red-300">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      <div onClick={()=>{navigate("/roomDetails")}}>
      <h3 className="text-lg font-semibold text-white mb-1">{buildingName}</h3>
      <p className="text-gray-400 text-sm">Persons Required: {personsRequired}</p>
      {address && <p className="text-gray-400 text-sm">Address: {address}</p>}
      </div>
     
    </div>
  )};

  export default RoomCard 