import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 600 },
    { name: "Apr", users: 200 },
  ];

  return (
    <div className="bg-white p-6 rounded shadow h-80">
      <h2 className="mb-4 font-semibold">User Growth</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
