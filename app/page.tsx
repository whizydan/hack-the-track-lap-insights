"use client";

import LapSelector from "@/components/lap-selector";
import TelemetryChart from "@/components/telemetry";
import { parseCsv } from "@/lib/csv-parser";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircuitMap from "@/components/circuit";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [laps, setLaps] = useState<number[]>([]);
  const [selectedLap, setSelectedLap] = useState<number | null>(null);
  const [lapData, setLapData] = useState<any[]>([]);

  // Load CSV and initialize laps
  useEffect(() => {
    parseCsv("/data/R1_barber_telemetry_mvp.csv").then((csvData) => {
      setData(csvData);

      // Convert lap to number in case CSV parser reads as string
      const uniqueLaps = Array.from(
        new Set(csvData.map((d) => Number(d.lap)))
      )
        .filter((lap) => lap > 0) // remove lap 0
        .sort((a, b) => a - b);

      setLaps(uniqueLaps);
      setSelectedLap(uniqueLaps[0]); // select first lap
    });
  }, []);

  // Update lapData whenever selectedLap or data changes
  useEffect(() => {
    if (selectedLap !== null && data.length > 0) {
      const filtered = data.filter((d) => Number(d.lap) === selectedLap);
      setLapData(filtered);
    }
  }, [selectedLap, data]);

  // Colors for charts
  const chartColors: Record<string, string> = {
    speed: "#4ade80",     // green
    throttle: "#3b82f6",  // blue
    brake: "#f87171",     // red
    gear: "#fbbf24",      // yellow
  };

  const lapDataWithXY = lapData.map(d => ({
    ...d,
    x: Number(d.VBOX_Long_Minutes),
    y: Number(d.VBOX_Lat_Min),
    speed: Number(d.speed),
    gear: Number(d.gear),
    brake: Number(d.pbrake_f) + Number(d.pbrake_r), // optional combined braking
  }));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900">🏁 Race Lap Analyzer</h1>

      {laps.length > 0 && selectedLap !== null && (
        <div className="flex justify-center">
          <LapSelector laps={laps} onSelect={setSelectedLap} />
        </div>
      )}

      {lapData.length > 0 && (
      <div className="flex justify-center mt-6">
        <CircuitMap data={lapDataWithXY} speedKey="speed" />
      </div>
    )}


      {lapData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {["speed", "throttle", "brake", "gear"].map((key) => (
            <Card key={key} className="shadow-lg border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold capitalize">{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <TelemetryChart
                  data={lapData}
                  telemetryKey={key}
                  color={chartColors[key]}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">Loading lap data...</p>
      )}
    </div>
  );
}
