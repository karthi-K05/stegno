import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all">
              PhotoCrypt
            </span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all"
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// import { Link } from 'react-router-dom';
// import { Shield, Home } from 'lucide-react';

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Shield className="h-8 w-8 text-indigo-600" />
//             <span className="text-xl font-bold text-gray-800">PhotoCrypt</span>
//           </Link>
//           <div className="flex space-x-4">
//             <Link
//               to="/"
//               className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600"
//             >
//               <Home className="h-5 w-5 mr-1" />
//               Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;