import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Loader className="text-yellow-500 animate-spin" size={48} />
    </div>
  );
}

export default Loading;
