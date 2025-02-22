import React from 'react';

const DisplayCard = ({ imageUrl, name, description }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden bg-gradient-to-b from-teal-400 via-purple-500 to-purple-600 p-0.5">
      <div className="bg-gray-900 rounded-lg p-3">
        {/* Image Container */}
        <div className="relative w-48 h-48 overflow-hidden rounded-lg mb-3 mx-auto">
          <img
            src={imageUrl || "/api/placeholder/200/200"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name Section */}
        <div className="mb-1.5">
          <h2 className="text-base font-bold text-white truncate">{name}</h2>
        </div>

        {/* Description Section */}
        <div className="text-gray-400 text-xs">
          <p className="line-clamp-2">{description}</p>
        </div>

        {/* Bottom Stats */}
        <div className="mt-2 flex items-center text-gray-500 text-xs">
        
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;