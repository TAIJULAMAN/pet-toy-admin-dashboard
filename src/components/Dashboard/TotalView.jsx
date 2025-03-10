/* eslint-disable react/prop-types */
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const demoData = [
  { month: "Jan", videoView: 50 },
  { month: "Feb", videoView: 70 },
  { month: "Mar", videoView: 60 },
  { month: "Apr", videoView: 80 },
  { month: "May", videoView: 90 },
  { month: "Jun", videoView: 75 },
  { month: "Jul", videoView: 85 },
  { month: "Aug", videoView: 95 },
  { month: "Sep", videoView: 70 },
  { month: "Oct", videoView: 80 },
  { month: "Nov", videoView: 100 },
  { month: "Dec", videoView: 110 },
];

const maxTrainerCount = Math.max(...demoData.map((item) => item.trainer), 100);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, videoView } = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-3 rounded-md border text-gray-700">
        <p className="font-medium">Month: {month}</p>
        <p className="font-medium">Trainers: {videoView}</p>
      </div>
    );
  }
  return null;
};

const TotalView = () => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={demoData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis tickLine={false} dataKey="month" className="text-gray-600" />
          <YAxis
            tickLine={false}
            domain={[0, maxTrainerCount + 10]}
            className="text-gray-600"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            barSize={30}
            radius={[5, 5, 0, 0]}
            dataKey="videoView"
            fill="#FF0000"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalView;
