import { FaUsers, FaVideo } from "react-icons/fa";
import { useGetTotalCountQuery } from "../../Redux/api/dashboard/dashboardApi";

export default function TotalSection() {
      const { data: totalCount } = useGetTotalCountQuery();
      console.log("totalCount", totalCount);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-2 lg:grid-cols-2 gap-5">
      {/* Total User */}
      <div className="flex justify-between items-center p-5 bg-[#F2F2F2]  gap-5 h-[80px] rounded-lg shadow-md">
        <div className="flex gap-3 items-center">
          <p className="rounded-full flex justify-center items-center">
            <FaUsers
              size={20}
              className=" bg-white rounded-full p-2 w-10 h-10 text-[#FF0000]"
            />
          </p>
          <p className="text-xl font-semibold">Total User</p>
        </div>
        <p className="text-[#FF0000] text-2xl font-bold mr-10">
          {totalCount?.data?.totalUsers}
        </p>
      </div>
      {/*  Total video */}
      <div className="flex justify-between items-center p-5 bg-[#F2F2F2] rounded-lg shadow-md gap-5 h-[80px]">
        <div className="flex gap-3 items-center">
          <p className="rounded-full flex justify-center items-center">
            <FaVideo
              size={20}
              className=" bg-white rounded-full p-2 w-10 h-10 text-[#FF0000]"
            />
          </p>
          <p className="text-xl font-semibold">Total video</p>
        </div>
        <p className="text-[#FF0000] text-2xl font-bold mr-10">
          {totalCount?.data?.totalVideos}
        </p>
      </div>
    </div>
  );
}
