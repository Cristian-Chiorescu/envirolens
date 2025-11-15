// components/PollutantChart.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PollutantDataPoint {
  name: string;
  value: number;
}

interface PollutantChartProps {
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    o3: number;
    co: number;
  };
}

export default function PollutantChart({ pollutants }: PollutantChartProps) {
  // Transform pollutant object into array format for chart
  const chartData: PollutantDataPoint[] = [
    { name: "PM2.5", value: pollutants.pm25 },
    { name: "PM10", value: pollutants.pm10 },
    { name: "NO₂", value: pollutants.no2 },
    { name: "O₃", value: pollutants.o3 },
    { name: "CO", value: pollutants.co },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Pollutant Levels
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
          <XAxis
            dataKey="name"
            stroke="oklch(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="oklch(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            label={{
              value: "μg/m³",
              angle: -90,
              position: "insideLeft",
              style: { fill: "oklch(var(--muted-foreground))" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: "8px",
              color: "oklch(var(--foreground))",
            }}
          />
          <Bar
            dataKey="value"
            fill="oklch(var(--primary))"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
