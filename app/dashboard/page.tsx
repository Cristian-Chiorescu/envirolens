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
import { ChevronRight, FileText } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAirQuality();
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
        <LoadingState />
      </DashboardLayout>
    );
  }

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

  const historicalData = generateMockHistoricalData(data.aqi);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Calgary Air Quality Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time environmental monitoring • Last updated:{" "}
          {formatDate(data.timestamp)}
        </p>
      </div>

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

      <div className="mb-8">
        <AQIStatusBanner aqi={data.aqi} status={data.status} />
      </div>

      <Link href="/projects">
        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-6 mb-8 hover:bg-secondary/15 transition duration-300 cursor-pointer group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <FileText className="text-primary"></FileText>
                View Relevant Past Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore how similar air quality conditions were handled in past
                consulting work.
              </p>
            </div>
            <ChevronRight className="text-primary transition duration-300 group-hover:translate-x-1"></ChevronRight>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AQITrendChart data={historicalData} />
        <PollutantChart pollutants={data.pollutants} />
      </div>

      <RegulatoryContext />
    </DashboardLayout>
  );
}

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
