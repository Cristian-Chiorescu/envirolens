// app/dashboard/page.tsx
"use client";

//componentize page

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import MetricCard from "@/components/metric-card";
import { AirQualityData } from "../types";
import { formatDate } from "../lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAirQuality();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAirQuality, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function fetchAirQuality() {
    try {
      const response = await fetch("/api/air-quality");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError("Failed to load air quality data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading air quality data...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-destructive mb-4">
              {error || "No data available"}
            </p>
            <button
              onClick={fetchAirQuality}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Prepare chart data for pollutants
  const pollutantData = [
    {
      name: "PM2.5",
      value: data.pollutants.pm25,
      color: "oklch(var(--chart-1))",
    },
    {
      name: "PM10",
      value: data.pollutants.pm10,
      color: "oklch(var(--chart-2))",
    },
    { name: "NO₂", value: data.pollutants.no2, color: "oklch(var(--chart-3))" },
    { name: "O₃", value: data.pollutants.o3, color: "oklch(var(--chart-4))" },
    { name: "CO", value: data.pollutants.co, color: "oklch(var(--chart-5))" },
  ];

  // Mock historical data for the trend chart (you'll replace this with real data later)
  const historicalData = generateMockHistoricalData(data.aqi);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Calgary Air Quality Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time environmental monitoring • Last updated:{" "}
          {formatDate(data.timestamp)}
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Air Quality Index"
          value={data.aqi}
          subtitle={data.status}
          color="primary"
          trend="stable"
        />
        <MetricCard
          title="Location"
          value={data.location.split(",")[0]}
          subtitle="Monitoring Station"
          color="default"
        />
        <MetricCard
          title="Primary Pollutant"
          value="PM2.5"
          subtitle={`${data.pollutants.pm25} μg/m³`}
          color="accent"
        />
        <MetricCard
          title="Health Risk"
          value={data.aqi <= 50 ? "Low" : data.aqi <= 100 ? "Moderate" : "High"}
          subtitle="For sensitive groups"
          color="secondary"
        />
      </div>

      {/* AQI Status Banner */}
      <div
        className={`rounded-xl border p-6 mb-8 ${
          data.aqi <= 50
            ? "bg-accent/10 border-accent/20"
            : data.aqi <= 100
            ? "bg-secondary/10 border-secondary/20"
            : "bg-destructive/10 border-destructive/20"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-background/50 flex items-center justify-center shrink-0">
            <span className="text-2xl">
              {data.aqi <= 50 ? "✓" : data.aqi <= 100 ? "⚠" : "⚠"}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {data.status} Air Quality
            </h3>
            <p className="text-sm text-muted-foreground">
              {data.aqi <= 50 &&
                "Air quality is satisfactory, and air pollution poses little or no risk. Outdoor activities are safe for all groups."}
              {data.aqi > 50 &&
                data.aqi <= 100 &&
                "Air quality is acceptable. However, sensitive individuals should consider limiting prolonged outdoor exertion."}
              {data.aqi > 100 &&
                "Members of sensitive groups may experience health effects. The general public is less likely to be affected."}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* AQI Trend Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            AQI Trend (24 Hours)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
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

        {/* Pollutant Breakdown Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Pollutant Levels
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pollutantData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
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
      </div>

      {/* Regulatory Context */}
      <div className="bg-muted/50 border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3 text-foreground">
          Regulatory Context
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-foreground mb-1">Alberta TIER</p>
            <p className="text-muted-foreground">
              Technology Innovation and Emissions Reduction regulation applies
              to facilities emitting ≥100,000 tonnes CO₂e annually
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Federal OBPS</p>
            <p className="text-muted-foreground">
              Output-Based Pricing System applies to industrial facilities in
              Alberta meeting federal thresholds
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">NPRI Reporting</p>
            <p className="text-muted-foreground">
              National Pollutant Release Inventory requires annual reporting of
              pollutant releases and transfers
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Helper function to generate mock historical data
// You'll replace this with real API data later
function generateMockHistoricalData(currentAQI: number) {
  const data = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const variance = Math.random() * 20 - 10;
    const aqi = Math.max(10, Math.min(150, currentAQI + variance));

    data.push({
      time: time.getHours() + ":00",
      aqi: Math.round(aqi),
    });
  }

  return data;
}
