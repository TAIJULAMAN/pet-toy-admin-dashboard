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
      className={`fixed lg:static bg-gradient-to-br from-slate-50 via-white to-red-50 text-[#0D0D0D] w-[70%] sm:w-[70%] md:w-[15%] lg:w-[15%] h-screen overflow-y-auto z-50 transition-all duration-300 ${isOpen ? "translate-x-0 top-0 left-0 shadow-2xl" : "-translate-x-full"
        } lg:translate-x-0 border-r border-gray-200/50 backdrop-blur-sm`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 right-5 lg:hidden text-white bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 focus:outline-none p-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-50"
      >
        <IoCloseSharp className="w-5 h-5" />
      </button>

      {/* Brand Logo Section */}
      <div className="pt-8 pb-6 px-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <img
            src="/header.png"
            className="w-16 h-12 object-contain drop-shadow-lg"
            alt="Pet Toy Logo"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Pet Toy
            </h1>
            <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <ul className="mt-6 px-4 space-y-1.5">
        {/* Dashboard Page */}
        <Link to="/">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <RxDashboard className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide">Dashboard</p>
          </li>
        </Link>

        {/* User Details Page */}
        <Link to="/user-details">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/user-details")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/user-details")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <FaRegUser className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide">User Details</p>
          </li>
        </Link>

        {/* Video List Page */}
        <Link to="/videoList">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/videoList")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/videoList")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <IoVideocamOutline className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide">Video List</p>
          </li>
        </Link>

        {/* Sound Library Page */}
        <Link to="/sound-library">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/sound-library")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/sound-library")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <MdAudiotrack className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide whitespace-nowrap">
              Add Sound Library
            </p>
          </li>
        </Link>

        {/* Divider */}
        <div className="py-3">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* About Us - direct link */}
        <Link to="/setting/about-us">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/setting/about-us")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/setting/about-us")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <IoMdInformationCircleOutline className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide">About Us</p>
          </li>
        </Link>

        {/* Privacy Policy - direct link */}
        <Link to="/setting/privacy-policy">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/setting/privacy-policy")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/setting/privacy-policy")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <MdOutlinePrivacyTip className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide">Privacy Policy</p>
          </li>
        </Link>

        {/* Terms and Conditions - direct link */}
        <Link to="/setting/terms-and-condition">
          <li
            className={`group flex items-center gap-3 cursor-pointer transition-all duration-300 ease-out ${isActive("/setting/terms-and-condition")
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3.5 rounded-xl shadow-lg shadow-red-500/30 scale-[1.02]"
              : "px-4 py-3.5 rounded-xl hover:bg-white/80 hover:shadow-md text-gray-700 hover:text-red-600 hover:scale-[1.02]"
              }`}
          >
            <div
              className={`p-2 rounded-lg transition-all duration-300 ${isActive("/setting/terms-and-condition")
                ? "bg-white/20"
                : "bg-gray-100 group-hover:bg-red-50 group-hover:scale-110"
                }`}
            >
              <FaRegBookmark className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold tracking-wide">Terms & Conditions</p>
          </li>
        </Link>
      </ul>

      {/* Logout Button */}
      <div className="absolute bottom-6 w-full px-4">
        <Link to="/sign-in">
          <button className="group flex items-center gap-3 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 text-white justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-400/20 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <IoLogInOutline className="w-5 h-5 font-bold relative z-10" />
            <span className="font-semibold text-sm tracking-wide relative z-10">
              Logout
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
