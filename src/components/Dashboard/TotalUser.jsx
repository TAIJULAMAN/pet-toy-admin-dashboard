/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import {
  Area,
  AreaChart,
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
  // Accepts various shapes and returns [{ month: 'Jan', netRevenue: number }]
  if (!apiData) return null;

  // Shape 0: { monthlyStats: [{ month: 10, count: 10 }, ...] }
  if (Array.isArray(apiData.monthlyStats)) {
    const source = year
      ? apiData.monthlyStats.filter((d) => Number(d.year) === Number(year))
      : apiData.monthlyStats;
    const mapped = source.map((d) => {
      const idx = Number(d.month) - 1;
      const label = monthShort[idx] ?? String(d.month);
      return { month: label, netRevenue: Number(d.count) || 0 };
    });
    return mapped;
  }

  // Shape A: [{ month: 'Jan', count: 10 }] or { monthName, total }
  if (Array.isArray(apiData)) {
    const mapped = apiData
      .map((d) => {
        const m = d.month || d.monthName || d.name;
        const v = d.count ?? d.total ?? d.value ?? d.users ?? d.netRevenue;
        if (!m || v == null) return null;
        // Try to coerce month to short label
        const idx = monthShort.findIndex(
          (s) => s.toLowerCase() === String(m).slice(0, 3).toLowerCase()
        );
        const label = idx >= 0 ? monthShort[idx] : String(m);
        return { month: label, netRevenue: Number(v) };
      })
      .filter(Boolean);
    if (mapped.length) return mapped;
  }

  // Shape B: { monthly: { Jan: 1, Feb: 2, ... } } or { months: {...} }
  const obj = apiData.monthly || apiData.months || apiData.data;
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const mapped = monthShort.map((m) => ({ month: m, netRevenue: Number(obj[m]) || 0 }));
    return mapped;
  }

  return null;
};

const TotalUser = ({ data, year }) => {
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

  const zeroData = monthShort.map((m) => ({ month: m, netRevenue: 0 }));

  const chartData = useMemo(() => {
    const normalized = normalizeData(data, year);
    return normalized && normalized.length ? normalized : zeroData;
  }, [data, year]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, netRevenue } = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white py-3 px-2 rounded">
          <p className="label">{`Month: ${month}`}</p>
          <p className="label">{`Users: ${netRevenue}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF0000" stopOpacity={1} />
              <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            tickLine={false}
            dataKey="month"
             className="text-gray-600"
          />

          <YAxis
            tickLine={false}
            className="text-gray-600"
            allowDecimals={false}
            tickFormatter={(v) => (Number.isFinite(v) ? Math.trunc(v) : v)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="netRevenue"
            stroke="#FF0000"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalUser;
