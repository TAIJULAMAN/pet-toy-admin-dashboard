import dayjs from "dayjs";
import TotalUser from "../../components/Dashboard/TotalUser";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useGetUserOverviewQuery } from "../../Redux/api/dashboard/dashboardApi";

export default function UserOverview() {
  const currentYear = dayjs().year();
  const startYear = 2023;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userOverviewData } = useGetUserOverviewQuery({
    year: selectedYear,
  });
  // console.log("userOverviewData", userOverviewData);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  return (
    <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
        <div>
          <h1 className="text-xl font-semibold">Total User Overview</h1>
        </div>
        <div className="flex justify-between items-center gap-5 whitespace-nowrap">
          <div className="flex justify-start items-center text-xs md:text-lg gap-5">
            <p>Monthly Growth</p>
            <p className="font-bold">{userOverviewData?.data?.yearlyGrowth}%</p>
          </div>
          <div className="relative w-full md:w-32">
            {/* Selected Year Display */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white transition"
            >
              <span className="text-[#FF0000]">{selectedYear}</span>
              <FaChevronDown className="text-[#FF0000] w-5 h-5 ml-5" />
            </button>

            {/* Dropdown List */}
            {isOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() => handleSelect(year)}
                    className={`p-2 cursor-pointer hover:bg-gray-100 transition ${
                      year === selectedYear ? "bg-gray-200" : ""
                    }`}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <TotalUser data={userOverviewData?.data} year={selectedYear} />
    </div>
  );
}
