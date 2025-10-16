/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const normalizeData = (apiData, year) => {
  if (!apiData) return null;

  if (Array.isArray(apiData.monthlyStats)) {
    const source = year
      ? apiData.monthlyStats.filter((d) => Number(d.year) === Number(year))
      : apiData.monthlyStats;
    return source.map((d) => {
      const idx = Number(d.month) - 1;
      const label = monthShort[idx] ?? String(d.month);
      return { month: label, videoView: Number(d.count) || 0 };
    });
  }

  if (Array.isArray(apiData)) {
    // Generic fallback if API returns array of objects with month/count
    return apiData
      .map((d) => {
        const m = d.month || d.monthName || d.name;
        const v = d.count ?? d.total ?? d.value ?? d.videoView;
        if (!m || v == null) return null;
        const idx = monthShort.findIndex(
          (s) => s.toLowerCase() === String(m).slice(0, 3).toLowerCase()
        );
        const label = idx >= 0 ? monthShort[idx] : String(m);
        return { month: label, videoView: Number(v) };
      })
      .filter(Boolean);
  }

  const obj = apiData.monthly || apiData.months || apiData.data;
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    return monthShort.map((m) => ({ month: m, videoView: Number(obj[m]) || 0 }));
  }

  return null;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, videoView } = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-3 rounded-md border text-gray-700">
        <p className="font-medium">Month: {month}</p>
        <p className="font-medium">Videos: {videoView}</p>
      </div>
    );
  }
  return null;
};

const TotalView = ({ data, year }) => {
  const [chartHeight, setChartHeight] = useState(220);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 220) {
        setChartHeight(250); // Adjust height for mobile
      } else if (window.innerWidth < 768) {
        setChartHeight(220); // Adjust height for smaller tablets
      } else {
        setChartHeight(220); // Default height for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount to set the initial height

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const zeroData = monthShort.map((m) => ({ month: m, videoView: 0 }));

  const chartData = useMemo(() => {
    const normalized = normalizeData(data, year);
    return normalized && normalized.length ? normalized : zeroData;
  }, [data, year]);

  const maxValue = useMemo(() => {
    return Math.max(...chartData.map((d) => d.videoView), 0);
  }, [chartData]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis tickLine={false} dataKey="month" className="text-gray-600" />
          <YAxis
            tickLine={false}
            allowDecimals={false}
            domain={[0, Math.max(maxValue, 10)]}
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
