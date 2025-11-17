import { ReactElement } from "react";

export interface AirQualityData {
  timestamp: string;
  location: string;
  aqi: number;
  status:
    | "Good"
    | "Moderate"
    | "Unhealthy for Sensitive Groups"
    | "Unhealthy"
    | "Very Unhealthy"
    | "Hazardous";
  pollutants: {
    pm25: number;
    pm10: number;
    no2: number;
    o3: number;
    co: number;
  };
}

export interface ConsultingProject {
  id: string;
  title: string;
  sector: string;
  jurisdiction: string;
  servieArea: string;
  tags: string[];
  summary: string;
  lessonsLearned: string;
  relevantAQIRange?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface FeatureCard {
  icon: ReactElement;
  color: string;
  title: string;
  description: string;
}

export interface AQICNPollutantValue {
  v: number;
}

export interface AQICNIAQI {
  co?: AQICNPollutantValue;
  h?: AQICNPollutantValue;
  no2?: AQICNPollutantValue;
  o3?: AQICNPollutantValue;
  p?: AQICNPollutantValue;
  pm25?: AQICNPollutantValue;
  pm10?: AQICNPollutantValue;
  so2?: AQICNPollutantValue;
  t?: AQICNPollutantValue;
  w?: AQICNPollutantValue;
  wg?: AQICNPollutantValue;
}

export interface AQICNCity {
  geo: [number, number];
  name: string;
  url: string;
  location: string;
}

export interface AQICNTime {
  s: string;
  tz: string;
  v: number;
  iso: string;
}

export interface AQICNAttribution {
  url: string;
  name: string;
  logo?: string;
}

export interface AQICNForecastDay {
  avg: number;
  day: string;
  max: number;
  min: number;
}

export interface AQICNForecast {
  daily: {
    pm10?: AQICNForecastDay[];
    pm25?: AQICNForecastDay[];
    uvi?: AQICNForecastDay[];
  };
}

export interface AQICNData {
  aqi: number;
  idx: number;
  attributions: AQICNAttribution[];
  city: AQICNCity;
  dominentpol: string;
  iaqi: AQICNIAQI;
  time: AQICNTime;
  forecast: AQICNForecast;
  debug: {
    sync: string;
  };
}

export interface AQICNResponse {
  status: string;
  data: AQICNData;
}
