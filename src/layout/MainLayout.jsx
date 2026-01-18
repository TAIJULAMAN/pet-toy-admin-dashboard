import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import MainHeader from "../components/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 w-full lg:w-[85%]">
        <MainHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-5 bg-[#F5F5F5]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
