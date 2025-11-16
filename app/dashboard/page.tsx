// app/dashboard/page.tsx

//componentize page/ fix colors on charts

// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import MetricCard from "@/components/metric-card";
import AQIStatusBanner from "@/components/aqi-status-banner";
import AQITrendChart from "@/components/aqi-trend-chart";
import PollutantChart from "@/components/pollutant-chart";
import RegulatoryContext from "@/components/regulatory-context";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import { AirQualityData } from "../../types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

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

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <DashboardLayout>
        <ErrorState
          message={error || "No data available"}
          onRetry={fetchAirQuality}
        />
      </DashboardLayout>
    );
  }

  // Generate historical trend data (mock for now)
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

      {/* Status Banner */}
      <div className="mb-8">
        <AQIStatusBanner aqi={data.aqi} status={data.status} />
      </div>

      {/* Link to Projects */}
      <Link href="/projects">
        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-6 mb-8 hover:bg-secondary/15 transition duration-300 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Relevant Past Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore how similar air quality conditions were handled in past
                consulting work.
              </p>
            </div>
            <svg
              className="w-6 h-6 text-secondary group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AQITrendChart data={historicalData} />
        <PollutantChart pollutants={data.pollutants} />
      </div>

      {/* Regulatory Context */}
      <RegulatoryContext />
    </DashboardLayout>
  );
}

// Helper function to generate mock historical data
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
