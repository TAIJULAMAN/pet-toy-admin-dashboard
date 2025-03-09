import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaUsers, FaVideo } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import RecentUsers from "../../components/Dashboard/RecentUsers";
import { useState } from "react";
import dayjs from "dayjs";
import TotalUser from "../../components/Dashboard/TotalUser";
import TotalView from "../../components/Dashboard/TotalView";

function DashboardPage() {
  const [selectedYear, setselectedYear] = useState(dayjs().year());
  const [selectedMonth, setselectedMonth] = useState(dayjs().month() + 1);
  const onChange = (e) => {
    const dateString = e.target.value;
    setselectedYear(dateString.split("-")[0]);
    setselectedMonth(dateString.split("-")[1]);
  };
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-2 lg:grid-cols-2 gap-5">
        {/* Total User */}
        <div className="flex justify-between items-center p-5 bg-[#F2F2F2]  gap-5 h-30 rounded-lg shadow-md">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUsers
                size={20}
                className=" bg-white rounded-full p-2 w-10 h-10 text-[#FF0000]"
              />
            </p>
            <p className="text-lg md:text-2xl font-semibold">Total User</p>
          </div>
          <p className="text-[#FF0000] text-3xl font-bold mr-10">1200</p>
        </div>
        {/*  Total video */}
        <div className="flex justify-between items-center p-5 bg-[#F2F2F2] rounded-lg shadow-md gap-5 h-30">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaVideo
                size={20}
                className=" bg-white rounded-full p-2 w-10 h-10 text-[#FF0000]"
              />
            </p>
            <p className="text-lg md:text-2xl font-semibold">Total video</p>
          </div>
          <p className="text-[#FF0000] text-3xl font-bold mr-10">100</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
          <div className="flex  items-start md:items-center justify-start">
            <h1 className="text-3xl font-bold mb-10">Total User Overview</h1>
            {/* <div className="w-full md:w-auto">
              <input
                type="month"
                value={`${selectedYear}-${String(selectedMonth).padStart(
                  2,
                  "0"
                )}`}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div> */}
          </div>
          <TotalUser />
        </div>
        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
          <div className="flex  items-start md:items-center justify-start">
            <h1 className="text-3xl font-bold mb-10">Total Video Overview</h1>
            {/* <div className="w-full md:w-auto">
              <input
                type="month"
                value={`${selectedYear}-${String(selectedMonth).padStart(
                  2,
                  "0"
                )}`}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div> */}
          </div>
          <TotalView />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-10">Recent Joined User</h1>
        <RecentUsers />
      </div>
    </div>
  );
}

export default DashboardPage;
