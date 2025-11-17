import { NextResponse } from "next/server";
import type { AirQualityData, AQICNResponse } from "@/types";

const AQICN_TOKEN = process.env.AQICN_API_TOKEN || "";

export async function GET() {
  try {
    if (!AQICN_TOKEN) {
      console.log("No AQICN token found, returning mock data");
      return NextResponse.json(generateMockData());
    }

    const response = await fetch(
      `https://api.waqi.info/feed/calgary/?token=${AQICN_TOKEN}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch air quality data");
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Invalid API Response");
    }

    const airQualityData = transformAQICNData(data);
    return NextResponse.json(airQualityData);
  } catch (error) {
    console.error(`Error fetching air quality data: ${error}`);
    return NextResponse.json(generateMockData());
  }
}

function transformAQICNData(data: AQICNResponse): AirQualityData {
  const aqi = data.data.aqi;
  const iaqi = data.data.iaqi;

  return {
    timestamp: new Date().toISOString(),
    location: data.data.city.name || "Calgary, AB",
    aqi,
    status: getStatus(aqi),
    pollutants: {
      pm25: iaqi.pm25?.v || 0,
      pm10: iaqi.pm10?.v || 0,
      no2: iaqi.no2?.v || 0,
      o3: iaqi.o3?.v || 0,
      co: iaqi.co?.v || 0,
    },
  };
}

function generateMockData(): AirQualityData {
  const now = new Date();
  const hour = now.getHours();

  const baseAQI = 35 + Math.sin((hour / 24) * Math.PI * 2) * 15;
  const aqi = Math.round(baseAQI + Math.random() * 10);

  return {
    timestamp: now.toISOString(),
    location: "Calgary, AB (Mock Data)",
    aqi,
    status: getStatus(aqi),
    pollutants: {
      pm25: Math.round(aqi * 0.4),
      pm10: Math.round(aqi * 0.6),
      no2: Math.round(aqi * 0.3),
      o3: Math.round(aqi * 0.5),
      co: Math.round(aqi * 2),
    },
  };
}

function getStatus(aqi: number): AirQualityData["status"] {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}
