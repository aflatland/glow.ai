import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// X icon positioned in top-right corner of the chatroom
export const ExitX = () => {
    return(
      <Link to = "/">
          <XMarkIcon className="absolute top-6 right-8 h-10 w-10 text-gray-600 cursor-pointer" />
      </Link>
    );
  };