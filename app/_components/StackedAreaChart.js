"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
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

const CustomYAxisTick = ({ x, y, payload }) => (
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

const emojiMap = {
  moisture: "💧",
  temperature: "🌡️",
  humidity: "💦",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-200 rounded shadow border border-slate-400 text-md">
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

export default function GroupedBarChart({ data }) {
  const transformedData = data.map((d) => ({
    ...d,
    dateTimeString: `${d.dateTime.date} ${d.dateTime.time}`,
  }));

  return (
    <div className="h-[80svh]">
      <ResponsiveContainer>
        <BarChart
          data={transformedData}
          margin={{ top: 50, right: 60, left: 0, bottom: 60 }}
          barCategoryGap="20%" // space between groups
          barGap={10} // space between bars in group
        >
          <CartesianGrid stroke="#000000" strokeDasharray="10 10" />

          <XAxis
            dataKey="dateTimeString"
            tick={<CustomXAxisTick />}
            interval={0}
            label={{
              value: "Time",
              position: "bottom",
              offset: 40,
              className: "fill-base-content text-sm",
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

          <Bar
            dataKey="moisture"
            fill="#5a7aaf"
            activeBar={
              <Rectangle fill="#39527a" stroke="#000000" strokeWidth={2} />
            }
          />
          <Bar
            dataKey="temperature"
            fill="#d67373"
            activeBar={
              <Rectangle fill="#a94f4f" stroke="#000000" strokeWidth={2} />
            }
          />
          <Bar
            dataKey="humidity"
            fill="#6bb76b"
            activeBar={
              <Rectangle fill="#4b744b" stroke="#000000" strokeWidth={2} />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
