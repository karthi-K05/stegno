import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to PhotoCrypt</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl">
        Secure your photos with advanced encryption. Choose whether you want to encrypt
        a new photo or decrypt an existing one.
      </p>
      <div className="flex space-x-6">
        <Link
          to="/encrypt"
          className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 
          text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg
          hover:shadow-xl"
        >
          <Lock className="h-5 w-5 mr-2" />
          Encrypt Photo
        </Link>
        <Link
          to="/decrypt"
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 
          text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg 
          hover:shadow-xl"
        >
          <Unlock className="h-5 w-5 mr-2" />
          Decrypt Photo
        </Link>
      </div>
    </div>
  );
};

export default Home;