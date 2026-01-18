/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../Redux/api/profileApi";
import { Url } from "../../config/envConfig";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { data: profileData } = useGetProfileQuery();
  console.log("profile data", profileData);

  const toAbsolute = (p) => {
    const s = String(p || "").trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return s;
    const base = (Url || "").replace(/\/+$/, "");
    const path = s.replace(/^\/+/, "");
    return `${base}/${path}`;
  };

  return (
    <div className="relative w-full">
      <header className="bg-gradient-to-br from-slate-50 via-white to-red-50 text-[#0D0D0D] shadow-sm">
        <div className="flex justify-between items-center px-5 md:px-10 h-[80px]">
          {/* Mobile Menu Button - Left Side */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Profile Section - Right Side */}
          <div
            onClick={() => navigate("/profile")}
            className="flex justify-end items-center gap-2 cursor-pointer"
          >
            <img
              src={toAbsolute(profileData?.data?.photo)}
              className="w-8 md:w-12 h-8 md:h-12 object-cover rounded-full"
              alt="User Avatar"
            />
            <h3 className="hidden md:block text-[#0D0D0D] text-lg font-semibold">
              {profileData?.data?.name}
            </h3>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
