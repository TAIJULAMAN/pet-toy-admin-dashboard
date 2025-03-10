/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { IoMdInformationCircleOutline, IoMdSettings } from "react-icons/io";
import {
  IoCloseSharp,
  IoLogInOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if current path matches a menu item
  const isActive = (path) => currentPath === path;

  // Check if any settings submenu is active
  const isSettingsActive = currentPath.startsWith("/setting");

  return (
    <div
      className={`fixed lg:static bg-white text-[#0D0D0D] w-[70%] sm:w-[70%] md:w-[20%] lg:w-[20%] h-screen overflow-y-auto py-5 md:py-0 z-50 transition-transform ${
        isOpen ? "translate-x-0 top-0 left-0 " : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 lg:hidden text-white bg-[#0D0D0D] focus:outline-none p-2 rounded-full"
      >
        <IoCloseSharp />
      </button>

      {/* Sidebar Menu */}
      <ul className="mt-10 px-5 mr-10 text-base sm-text-lg md:text-xl">
        {/* Dashboard Page */}
        <Link to="/">
          <li
            className={`flex items-center gap-2 md:gap-4 cursor-pointer ${
              isActive("/")
                ? "bg-[#FF0000] text-white px-5 py-4 rounded-l-4xl text-lg "
                : ""
            }`}
          >
            <RxDashboard className="w-5 md:w-8 h-5 md:h-8 text-xl font-semibold" />
            <p className="text-xl font-semibold">Dashboard</p>
          </li>
        </Link>

        {/* User Details Page */}
        <Link to="/user-details">
          <li
            className={`flex items-center gap-2 md:gap-4 mt-8 cursor-pointer whitespace-nowrap ${
              isActive("/user-details")
                ? "bg-[#FF0000] text-white px-5 py-4 rounded-l-4xl"
                : ""
            }`}
          >
            <FaRegUser className="w-5 md:w-8 h-5 md:h-8 text-xl font-semibold" />
            <p className="text-xl font-semibold">User Details</p>
          </li>
        </Link>

        {/* Video List Page */}
        <Link to="/videoList">
          <li
            className={`flex items-center gap-2 md:gap-4 mt-8  whitespace-nowrap ${
              isActive("/videoList")
                ? "bg-[#FF0000] text-white px-5 py-4 rounded-l-4xl"
                : ""
            }`}
          >
            <IoVideocamOutline className="w-5 md:w-8 h-5 md:h-8 text-xl font-semibold" />
            <p className="text-xl font-semibold">Video List</p>
          </li>
        </Link>

        {/* Settings */}
        <Link to="/settings">
          <li
            className={`flex justify-between items-center gap-2 md:gap-4 mt-8 cursor-pointer py-2 whitespace-nowrap ${
              isSettingsActive
                ? "bg-[#00C0B5] text-white pl-5 pr-2 py-4 rounded-l-4xl"
                : ""
            }`}
          >
            <div className="flex flex-row justify-between items-center gap-2">
              <IoMdSettings className="w-8 h-8 text-xl font-semibold" />
              <p className="text-xl font-semibold">Settings</p>
            </div>
            <SlArrowDown className="w-5  h-5  text-xl font-bold" />
          </li>
        </Link>

        {/* Settings Submenu */}
        {isSettingsActive && (
          <ul className="text-start py-3 ml-5">
            <Link to="/setting/about-us">
              <li
                className={`py-[5px] flex items-center gap-2 ${
                  isActive("/setting/about-us") ? "text-[#00c0b5]" : ""
                }`}
              >
                <IoMdInformationCircleOutline className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">About Us</p>
              </li>
            </Link>

            <Link to="/setting/privacy-policy">
              <li
                className={`py-[6px] flex items-center gap-4 ${
                  isActive("/setting/privacy-policy") ? "text-[#00c0b5]" : ""
                }`}
              >
                <MdOutlinePrivacyTip className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Privacy Policy</p>
              </li>
            </Link>
            <Link to="/setting/faq">
              <li
                className={`py-[6px] flex items-center gap-4 ${
                  isActive("/setting/faq") ? "text-[#00c0b5]" : ""
                }`}
              >
                <GoQuestion className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">FAQ</p>
              </li>
            </Link>

            <Link to="/setting/terms-and-condition">
              <li
                className={`py-[5px] flex gap-2 items-center  ${
                  isActive("/setting/terms-and-condition")
                    ? "text-[#00c0b5]"
                    : ""
                }`}
              >
                <FaRegBookmark className="w-5 h-5 text-lg font-semibold" />
                <p className="text-lg font-semibold">Terms and Conditions</p>
              </li>
            </Link>
          </ul>
        )}
      </ul>

      {/* Logout Button */}
      <div className="absolute mt-5 md:mt-20 lg:mt-20 xl:mt-20 w-full px-4">
        <Link to="/sign-in">
          <button className="flex items-center gap-4 w-full py-3 rounded-lg">
            <IoLogInOutline className="w-8 h-8 text-xl font-semibold" />
            <span className="text-xl font-semibold">Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
