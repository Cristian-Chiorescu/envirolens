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
  timestamp: Date;
}

export interface FeatureCard {
  icon: ReactElement;
  color: string;
  title: string;
  description: string;
}
