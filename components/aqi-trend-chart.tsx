// components/AQITrendChart.tsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendDataPoint {
  time: string;
  aqi: number;
}

interface AQITrendChartProps {
  data: TrendDataPoint[];
}

export default function AQITrendChart({ data }: AQITrendChartProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        AQI Trend (24 Hours)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="oklch(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="oklch(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: "8px",
              color: "oklch(var(--foreground))",
            }}
          />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="oklch(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "oklch(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
