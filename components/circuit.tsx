"use client";

interface CircuitMapProps {
  data: any[];
  speedKey?: string; // color by speed or brake
  width?: number;
  height?: number;
}

export default function CircuitMap({ data, speedKey = "speed", width = 500, height = 500 }: CircuitMapProps) {
  if (!data || data.length === 0) return null;

  const xs = data.map(d => d.x);
  const ys = data.map(d => d.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const normalize = (v: number, min: number, max: number, size: number) =>
    ((v - min) / (max - min)) * size;

  return (
    <svg width={width} height={height} className="border rounded-md">
      {/* Connect all points */}
      <polyline
        fill="none"
        stroke="gray"
        strokeWidth={1}
        points={data.map(d => `${normalize(d.x, minX, maxX, width)},${normalize(d.y, minY, maxY, height)}`).join(" ")}
      />

      {/* Plot circles colored by speed or brake */}
      {data.map((d, i) => {
        const nx = normalize(d.x, minX, maxX, width);
        const ny = normalize(d.y, minY, maxY, height);

        const val = d[speedKey] ?? 0;
        // color: red = slow/brake, green = fast/accel
        const color = speedKey === "speed"
          ? `rgb(${255 - val}, ${Math.min(val * 2, 255)}, 0)`
          : `rgb(${Math.min(val * 2, 255)}, 0, ${255 - val})`;

        return <circle key={i} cx={nx} cy={ny} r={2} fill={color} />;
      })}
    </svg>
  );
}
