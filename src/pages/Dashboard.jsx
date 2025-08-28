import Sidebar from "../components/Slidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import Chart from "../components/Chart/Chart";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Total Users" value="1300" />
            <Card title="Total Students" value="$55K" />
            <Card title="Total Agents" value="320" />
          </div>
          <Chart />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
