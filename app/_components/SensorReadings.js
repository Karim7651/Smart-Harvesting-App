"use client";
import StackedAreaChart from "./StackedAreaChart";
import Pagination from "./Pagination";
export default function SensorReadings({ data, setPageNumber,pageNumber }) {
  return (
    <div className="grid grid-cols-1 gap-6 p-8 h-auto ">
      {data.map((farmData, index) => (
        <div key={index} className="bg-base-200 p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 mt-2 text-center">
            {farmData.farmName}
          </h2>
          <StackedAreaChart data={farmData.readings} />
        </div>
      ))}
      <Pagination
        totalPages={data[0]?.totalPages || 1}
        currentPage={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
