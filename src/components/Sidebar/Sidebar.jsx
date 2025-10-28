/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  IoCloseSharp,
  IoLogInOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdAudiotrack, MdOutlinePrivacyTip } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if current path matches a menu item
  const isActive = (path) => currentPath === path;

  return (
    <div
      className={`fixed lg:static bg-white text-[#0D0D0D] w-[70%] sm:w-[70%] md:w-[15%] lg:w-[15%] h-screen overflow-y-auto py-5 md:py-0 z-50 transition-transform ${isOpen ? "translate-x-0 top-0 left-0 " : "-translate-x-full"
        } lg:translate-x-0 border-r border-gray-200 lg:border-r lg:border-gray-200 shadow-none lg:shadow-none`}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-white bg-[#0D0D0D] hover:bg-[#1a1a1a] focus:outline-none p-2 rounded-full transition-colors"
      >
        <IoCloseSharp />
      </button>

      {/* Sidebar Menu */}
      <ul className="mt-10 pl-5 text-[10px]">
        {/* Dashboard Page */}
        <Link to="/">
          <li
            className={`group flex items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <RxDashboard className="w-5 h-5" />
            <p className="text-lg font-semibold">Dashboard</p>
          </li>
        </Link>

        {/* User Details Page */}
        <Link to="/user-details">
          <li
            className={`group flex items-center gap-2 mt-5 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/user-details")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <FaRegUser className="w-5 h-5" />
            <p className="text-lg font-semibold">User Details</p>
          </li>
        </Link>

        {/* Video List Page */}
        <Link to="/videoList">
          <li
            className={`group flex items-center gap-2 mt-5 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/videoList")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <IoVideocamOutline className="w-5 h-5" />
            <p className="text-lg font-semibold">Video List</p>
          </li>
        </Link>
        {/* Sound Library Page */}
        <Link to="/sound-library">
          <li
            className={`group flex items-center whitespace-nowrap gap-2 mt-5 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/sound-library")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <MdAudiotrack className="w-5 h-5" />
            <p className="text-lg font-semibold">Add Sound Library</p>
          </li>
        </Link>

        {/* About Us - direct link */}
        <Link to="/setting/about-us">
          <li
            className={`group flex items-center gap-2 mt-5 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/setting/about-us")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <IoMdInformationCircleOutline className="w-5 h-5" />
            <p className="text-lg font-semibold">About Us</p>
          </li>
        </Link>

        {/* Privacy Policy - direct link */}
        <Link to="/setting/privacy-policy">
          <li
            className={`group flex items-center gap-2 mt-5 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/setting/privacy-policy")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <MdOutlinePrivacyTip className="w-5 h-5" />
            <p className="text-lg font-semibold">Privacy Policy</p>
          </li>
        </Link>

        {/* Terms and Conditions - direct link */}
        <Link to="/setting/terms-and-condition">
          <li
            className={`group flex items-center gap-2 mt-5 cursor-pointer transition-all duration-200 ease-in-out ${isActive("/setting/terms-and-condition")
                ? "border-l-4 border-[#FF0000] bg-[#FFF5F5] text-[#FF0000] px-3 py-3 rounded-l-4xl shadow-sm"
                : "px-3 py-3 rounded-l-4xl hover:bg-gray-100 text-[#0D0D0D] hover:text-[#FF0000]"
              }`}
          >
            <FaRegBookmark className="w-5 h-5" />
            <p className="text-lg font-semibold">Terms and Conditions</p>
          </li>
        </Link>
      </ul>

      {/* Logout Button */}
      <div className="absolute mt-8 md:mt-20 mmd:mt-20 w-full px-5">
        <Link to="/sign-in">
          <button
            className="flex items-center gap-4 w-full py-3 rounded-lg bg-[#a33131] hover:bg-primary duration-200 text-white justify-center "
          // onClick={handleLogout}
          >
            <IoLogInOutline className="w-5 h-5 font-bold" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
