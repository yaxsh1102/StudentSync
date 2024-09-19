import {  Home,  Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const DormitoryCard = ({ id,name, address, capacity, description, isOwned, onDelete }) => {
    const navigate  = useNavigate() 
    
    
    
    return (

 <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
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
    <div onClick={()=>{navigate(`/dormitoryDetails/${id}`)}}>
    <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
    <p className="text-gray-400 text-sm mb-1">{address}</p>
    <p className="text-gray-400 text-sm mb-1">{description}</p>
    <p className="text-gray-400 text-sm">Capacity: {capacity}</p>
    </div>
    
  </div>
 
);
}

export default DormitoryCard