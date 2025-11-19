import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TelemetryChartProps {
  data: any[];
  telemetryKey: string;
}

export default function TelemetryChart({ data, telemetryKey }: TelemetryChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    [telemetryKey]: Number(d[telemetryKey]),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="timestamp" hide />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={telemetryKey} stroke="#4ade80" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
