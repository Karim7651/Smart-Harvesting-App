"use client";
import { useEffect, useState } from "react";
import Loading from "../_components/Loading";
import { useUser } from "../_contexts/userContext";
import SensorReadings from "../_components/SensorReadings";

export default function Dashboard() {
  const { user, loading } = useUser();
  const [readings, setReadings] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!user || !user.farms?.length) return;

    const fetchSensorData = async () => {
      setFetching(true);
      try {
        const responses = await Promise.all(
          user.farms.map(async (farmId) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API}/farms/${farmId}/sensorReadings?sort=timestamp&page=${pageNumber}&limit=4`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            if (res.status === 404) return null; // Skip 404 responses (for empty farms)
            const json = await res.json();
            const sensorReadings = json?.data?.sensorReadings || [];

            const formatted = sensorReadings.map((r) => {
              const timestamp = new Date(r.timestamp);
              return {
                dateTime: {
                  time: timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }),
                  date: timestamp.toLocaleDateString("en-GB"),
                },
                temperature: parseFloat(r.temperature),
                humidity: parseFloat(r.humidity),
                moisture: parseFloat(r.moisture.replace("%", "")),
                totalPages:r.totalPages,
              };
            });
            return {
              farmId,
              farmName: json?.data?.sensorReadings?.[0]?.farm?.name || farmId,
              totalPages:json?.totalPages,
              readings: formatted,
            };
          })
        );
        // Filter out null values (those with 404) for empty farms
        setReadings(responses.filter((res) => res !== null));
      } catch (err) {
        console.error("Error fetching sensor readings:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchSensorData();
  }, [user, pageNumber]);

  if (loading || fetching) return <Loading />;

  if (!user) {
    return (
      <main className="h-svh flex items-center justify-center mx-auto flex-col">
        <h2 className="text-3xl font-bold text-base-content select-none">
          Login | Sign Up to view the dashboard
        </h2>
        <p className="text-xl font-light text-base-content select-none mt-2">
          You must be logged in to access the dashboard.
        </p>
      </main>
    );
  }

  return (
    <div className="mt-20">
      <h1 className="text-4xl font-semibold mb-6 text-center">Dashboard</h1>
      <SensorReadings data={readings} setPageNumber={setPageNumber} pageNumber={pageNumber} />
    </div>
  );
}
