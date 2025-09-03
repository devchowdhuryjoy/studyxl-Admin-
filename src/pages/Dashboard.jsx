import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Slidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Chart from "../components/Chart/Chart";

const Dashboard = () => {
  const location = useLocation();
  const showDashboardMain = location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 overflow-auto">
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
          <div className="mt-0">
            <Outlet /> {/* Student / University pages render here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;







