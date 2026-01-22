import React, {  useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Slidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Chart from "../components/Chart/Chart";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const showDashboardMain = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen overflow-hidden">
     <aside className={`
        fixed inset-y-0 left-0 z-50 lg:z-auto
        lg:sticky lg:top-0 lg:h-screen 
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
       <header className="sticky top-0 z-30 w-full flex-shrink-0 bg-white border-b border-gray-100 shadow-sm">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>

        <main className="p-4 lg:p-6 flex-1 overflow-x-hidden scroll-smooth">
          {showDashboardMain && (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card title="Total Users" value="1300" />
                <Card title="Total Students" value="550" />
                <Card title="Total Agents" value="320" />
              </div>
              <Chart />
            </>
          )}

          {/* Nested route content */}
          <div className="mt-0 min-w-0">
            <Outlet /> {/* Student / University pages render here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;







