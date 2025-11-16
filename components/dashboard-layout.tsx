// components/DashboardLayout.tsx (update the nav section)
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // ADD THIS
import { useState, useEffect } from "react";
import FloatingAIChat from "./floating-ai-chat";
import { AirQualityData } from "@/types";
import Header from "./header";
import Footer from "./footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );

  useEffect(() => {
    async function fetchAirQuality() {
      try {
        const response = await fetch("/api/air-quality");
        if (response.ok) {
          const data = await response.json();
          setAirQualityData(data);
        }
      } catch (error) {
        console.error("Failed to fetch air quality:", error);
      }
    }
    fetchAirQuality();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header></Header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-8 md:px-4 py-8">
        {children}
      </main>

      <Footer></Footer>

      {/* Global AI Assistant */}
      {airQualityData && <FloatingAIChat airQualityData={airQualityData} />}
    </div>
  );
}
