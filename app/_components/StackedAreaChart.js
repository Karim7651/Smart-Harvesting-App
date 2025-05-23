"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload }) => {
  const dateTime = payload.value || ""; // label is am / pm
  const [date, time, label] = dateTime.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={50}
        textAnchor="middle"
        className="fill-base-content text-[0.6rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]"
      >
        {`${time} ${label}`}
      </text>
      <text
        x={0}
        y={0}
        dy={25}
        textAnchor="middle"
        className="fill-base-content text-[0.6rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]"
      >
        {date}
      </text>
    </g>
  );
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y}
      dy={4}
      dx={-10}
      textAnchor="end"
      className="fill-base-content text-[0.6rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem]"
    >
      {payload.value}
    </text>
  );
};
//the box that shows when hovering
const emojiMap = {
  moisture: "💧",
  temperature: "🌡️",
  humidity: "💦",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-200  rounded shadow border border-slate-400 text-md">
        {payload.map((entry, index) => (
          <div key={index}>
            <p className="text-base-content p-4">
              {`${emojiMap[entry.name] || ""} ${entry.name}: ${entry.value}`}
            </p>
            {index < payload.length - 1 && (
              <div className="border-t border-gray-400 my-2 w-[100%]" />
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
};







export default function StackedAreaChart({ data }) {
  const transformedData = data.map((d) => ({
    ...d,
    dateTimeString: `${d.dateTime.date} ${d.dateTime.time}`,
  }));

  return (
    <div className="h-[80svh]">
      <ResponsiveContainer>
        <AreaChart
          data={transformedData}
          margin={{ top: 50, right: 60, left: 0, bottom: 50 }}
        >
          <CartesianGrid stroke="#94a3b8" strokeDasharray="3 3" />

          <XAxis
            dataKey="dateTimeString"
            tick={<CustomXAxisTick />}
            interval={0}
            label={{
              value: "Time",
              position: "bottom",
              offset: 20,
              className: "fill-base-content text-sm ",
            }}
          />
          <YAxis
            tick={<CustomYAxisTick />}
            label={{
              value: "Values",
              angle: -90,
              position: "insideLeft",
              offset: 5,
              className: "fill-base-content text-sm",
            }}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="moisture"
            stackId="1"
            stroke="#003366"
            fill="#003366"
          />
          <Area
            type="monotone"
            dataKey="temperature"
            stackId="1"
            stroke="#B22222"
            fill="#B22222"
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stackId="1"
            stroke="#228B22"
            fill="#228B22"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
