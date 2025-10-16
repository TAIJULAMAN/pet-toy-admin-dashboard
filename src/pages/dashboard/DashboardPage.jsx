import RecentUsers from "../../components/Dashboard/RecentUsers";
import TotalSection from "./TotalSection";
import UserOverview from "./UserOverview";
import VideoOverview from "./VideoOverview";

function DashboardPage() {
  return (
    <div className="flex flex-col">
      <TotalSection />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <UserOverview />
        <VideoOverview />
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-5">Recent Joined User</h1>
        <RecentUsers />
      </div>
    </div>
  );
}

export default DashboardPage;
