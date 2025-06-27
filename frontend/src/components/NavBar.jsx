import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { BiCompass } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
// import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";

import { useAuth } from '../config/AuthContext'

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { user , logout , isLogedIn } = useAuth()
  
  console.log(user);
  
  

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger icon for mobile */}

      <div className="md:hidden p-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">
        
        <button onClick={handleSidebarToggle} className="text-3xl">
          <HiMenuAlt3 />
        </button>

        <h1 className="text-2xl font-bold">Instagram</h1>

      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-400 z-50 p-4 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
            >
              Reely
            </Link>
          </li>

          <li>
            <Link
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
            >
              <FaHome />
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
            >
              <FaSearch />
              Search
            </Link>
          </li>

          <li>
            <Link
              to="/explore"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
            >
              <BiCompass />
              Explore
            </Link>
          </li>

          <li>
            <Link
              to="/create"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
            >
              <FiPlusSquare />
              Create
            </Link>
          </li>

          {
            isLogedIn ? 
               <li>
                    <Link
                      to="/profile"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
                    >
          
                      {
                        user.profile_photo ? 
                        <img src={user.profile_photo} alt={user.name}  className="rounded-lg border-2 h-8 w-8"/> :
                        <div className="rounded-full w-8 h-8 border-2 text-pink-600 flex items-center justify-center text-xl">{user.username[0]}</div>
                      }

                      Profile
                    </Link>
               </li> :
               <li>
                    <Link to='/login'
                    className="flex items-center gap-3 text-xl font-bold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded p-2"
                    >
                        <FiLogIn />Login
                    </Link>
               </li>
          }

          {
            isLogedIn && 
               <li>
                    <Link
                      to="/"
                      className="flex items-center gap-3 text-xl font-bold text-red-600 hover:text-white hover:bg-red-700 rounded p-2"
                    >
                      <button onClick={()=>logout()}
                      >Logout</button>

                    </Link>
               </li> 
          }

        </ul>

      </div>

    </>
  );
};

export default Sidebar;
