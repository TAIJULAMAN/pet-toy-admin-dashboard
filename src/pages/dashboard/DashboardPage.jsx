import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import RecentUsers from "../../components/Dashboard/RecentUsers";
import TotalUser from "../../components/Dashboard/TotalUsers";
import TotalEarningGrowth from "../../components/Dashboard/TotalEarningGrowth";
import { useState } from "react";
import dayjs from "dayjs";

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
      <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total User */}
        <div className="flex  justify-between items-center p-5 bg-[#E6FAF9] rounded-md gap-5 h-30">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUsers
                size={20}
                className=" bg-white rounded-full p-2 w-10 h-10 text-[#00c0b5]"
              />
            </p>
            <p className="text-lg md:text-2xl font-semibold">Total User</p>
          </div>
          <p className="text-[#00c0b5] text-3xl font-bold mr-10">1200</p>
        </div>
        {/*  Total Service Provider */}
        <div className="flex  justify-between items-center p-5 bg-[#E6FAF9] rounded-md gap-5 h-30">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <GrServices
                size={20}
                className=" bg-white rounded-full p-2 w-10 h-10 text-[#00c0b5]"
              />
            </p>
            <p className="text-lg md:text-2xl font-semibold">
              Total Service Provider
            </p>
          </div>
          <p className="text-[#00c0b5] text-3xl font-bold mr-10">100</p>
        </div>
        {/* Total Earning */}
        <div className="flex  justify-between items-center p-5 bg-[#E6FAF9] rounded-md gap-5 h-30">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <AiOutlineFundProjectionScreen
                size={20}
                className=" bg-white rounded-full p-2 w-10 h-10 text-[#00c0b5]"
              />
            </p>
            <p className="text-lg md:text-2xl font-semibold">Total Earning</p>
          </div>
          <p className="text-[#00c0b5] text-3xl font-bold mr-10">200</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold mb-5">Total users statistics</h1>
            <div className="w-full md:w-auto">
              <input
                type="month"
                value={`${selectedYear}-${String(selectedMonth).padStart(
                  2,
                  "0"
                )}`}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <TotalUser />
        </div>
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold mb-5">Total earning growth</h1>
            <div className="w-full md:w-auto">
              <input
                type="month"
                value={`${selectedYear}-${String(selectedMonth).padStart(
                  2,
                  "0"
                )}`}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <TotalEarningGrowth />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-5">Recent Users</h1>
        <RecentUsers />
      </div>
    </div>
  );
}

export default DashboardPage;
