import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PollutantDataPoint {
  name: string;
  value: number;
  color: string;
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
  const chartData: PollutantDataPoint[] = [
    { name: "PM2.5", value: pollutants.pm25, color: "var(--chart-1)" },
    { name: "PM10", value: pollutants.pm10, color: "var(--chart-2)" },
    { name: "NO₂", value: pollutants.no2, color: "var(--chart-3)" },
    { name: "O₃", value: pollutants.o3, color: "var(--chart-4)" },
    { name: "CO", value: pollutants.co, color: "var(--chart-5)" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Pollutant Levels
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="name"
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
            label={{
              value: "μg/m³",
              angle: -90,
              position: "insideLeft",
              style: { fill: "var(--muted-foreground)" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "(--foreground)",
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
