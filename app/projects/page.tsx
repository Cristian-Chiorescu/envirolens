"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import ProjectCard from "@/components/project-card";
import ProjectFilters from "@/components/project-filters";
import {
  consultingProjects,
  ConsultingProject,
} from "@/data/consultingProjects";
import { AirQualityData } from "@/types";
import { Zap } from "lucide-react";

export default function ProjectsPage() {
  const [currentAQI, setCurrentAQI] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedRegulation, setSelectedRegulation] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAirQuality() {
      try {
        const response = await fetch("/api/air-quality");
        if (response.ok) {
          const data: AirQualityData = await response.json();
          setCurrentAQI(data.aqi);
        }
      } catch (error) {
        console.error("Failed to fetch air quality:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAirQuality();
  }, []);

  const filteredProjects = consultingProjects.filter((project) => {
    if (selectedSector !== "All" && project.sector !== selectedSector) {
      return false;
    }

    if (
      selectedRegulation !== "All" &&
      !project.tags.includes(selectedRegulation)
    ) {
      return false;
    }

    return true;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!currentAQI) return 0;

    const isARelevant = isProjectRelevantToAQI(a, currentAQI);
    const isBRelevant = isProjectRelevantToAQI(b, currentAQI);

    if (isARelevant && !isBRelevant) return -1;
    if (!isARelevant && isBRelevant) return 1;
    return 0;
  });

  const relevantCount = currentAQI
    ? filteredProjects.filter((p) => isProjectRelevantToAQI(p, currentAQI))
        .length
    : 0;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Project Knowledge Base
        </h1>
        <p className="text-muted-foreground">
          Past consulting projects and institutional knowledge
        </p>
      </div>

      {!loading && currentAQI !== null && (
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center shrink-0">
              <Zap className="text-muted-foreground"></Zap>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">
                Current Calgary AQI: {currentAQI} ({getAQIStatus(currentAQI)})
              </p>
              <p className="text-sm text-muted-foreground">
                There {relevantCount === 1 ? "is " : "are "}
                <span className="font-semibold">{relevantCount}</span> past{" "}
                {relevantCount === 1 ? "project" : "projects"} relevant to
                current conditions
                {relevantCount > 0 && " (highlighted below)"}
              </p>
            </div>
          </div>
        </div>
      )}
      <ProjectFilters
        selectedSector={selectedSector}
        selectedRegulation={selectedRegulation}
        onSectorChange={setSelectedSector}
        onRegulationChange={setSelectedRegulation}
      />

      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className={
                currentAQI && isProjectRelevantToAQI(project, currentAQI)
                  ? "transition ring-6 ring-secondary/50 rounded-xl inset-shadow-sm inset-shadow-accent shadow-lg hover:shadow-xl shadow-accent/50"
                  : ""
              }
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No projects match your current filters.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

function isProjectRelevantToAQI(
  project: ConsultingProject,
  currentAQI: number
): boolean {
  const [min, max] = project.relevantAQIRange.split("-").map(Number);
  return currentAQI >= min && currentAQI <= max;
}

function getAQIStatus(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}
