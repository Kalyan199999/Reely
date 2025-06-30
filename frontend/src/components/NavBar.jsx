import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { BiCompass } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from '../config/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isLogedIn } = useAuth();

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Navbar with Hamburger */}
      <div className="md:hidden p-4 bg-white shadow flex items-center justify-between fixed top-0 left-0 right-0 z-40">
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
        className={`fixed md:fixed top-0 left-0 h-screen w-64 bg-pink-600 z-50 p-4 overflow-y-auto 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <ul className="space-y-4 pt-16 md:pt-4"> {/* padding top to prevent overlap with top nav */}
          <li>
            <Link
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
            >
              Reely
            </Link>
          </li>

          <li>
            <Link
              to="/"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
            >
              <FaHome />
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
            >
              <FaSearch />
              Search
            </Link>
          </li>

          <li>
            <Link
              to="/explore"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
            >
              <BiCompass />
              Explore
            </Link>
          </li>

          <li>
            <Link
              to="/create"
              onClick={closeSidebar}
              className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
            >
              <FiPlusSquare />
              Create
            </Link>
          </li>

          {isLogedIn ? (
            <li>
              <Link
                to="/profile"
                onClick={closeSidebar}
                className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
              >
                {user?.data?.profile_photo ? (
                  <img
                    src={`http://localhost:5050/${user.data.profile_photo.destination}/${user.data.profile_photo.filename}`}
                    alt={user.data.username}
                    className="rounded-full h-8 w-8 border-2"
                  />
                ) : (
                  <div className="rounded-full w-8 h-8 bg-white text-pink-600 font-bold flex items-center justify-center">
                    {user?.data?.username[0]}
                  </div>
                )}
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={closeSidebar}
                className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-100 hover:bg-pink-500 rounded p-2"
              >
                <FiLogIn />
                Login
              </Link>
            </li>
          )}

          {isLogedIn && (
            <li>
              <button
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
                className="flex items-center gap-3 text-xl font-bold text-white hover:text-white hover:bg-red-700 rounded p-2"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
