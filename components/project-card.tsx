import { ConsultingProject } from "@/data/consultingProjects";

interface ProjectCardProps {
  project: ConsultingProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const sectorColors = {
    "Oil & Gas": "bg-chart-1/20 text-chart-1 border-chart-1/20",
    Mining: "bg-chart-2/20 text-chart-2 border-chart-2/20",
    Hydrogen: "bg-chart-3/20 text-chart-3 border-chart-3/20",
    "Clean Fuels": "bg-chart-4/20 text-chart-4 border-chart-4/20",
    Manufacturing: "bg-chart-5/20 text-chart-5 border-chart-5/20",
  };
  return (
    <div className="h-full bg-transparent border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/30">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            {project.title}
          </h3>
          <span
            className={`text-xs font-medium px-2 py-1 rounded border ${
              sectorColors[project.sector]
            }`}
          >
            {project.sector}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {project.client} • {project.completedDate}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
          >
            {tag}
          </span>
        ))}
        <span className="text-xs px-2 py-1 bg-accent/20 text-secondary rounded">
          AQI: {project.relevantAQIRange}
        </span>
      </div>
      <div className="flex-col">
        <div className="mb-3">
          <p className="text-xs font-bold text-muted-foreground mb-1">
            Problem
          </p>
          <p className="text-sm text-foreground">{project.problemSummary}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs font-bold text-muted-foreground mb-1">
            Approach
          </p>
          <p className="text-sm text-foreground">{project.approachSummary}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs font-bold text-muted-foreground mb-1">
            Outcome
          </p>
          <p className="text-sm text-foreground">{project.outcome}</p>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
          <p className="text-xs font-bold text-primary mb-1">Key Lesson</p>
          <p className="text-sm text-foreground">{project.lessonsLearned}</p>
        </div>
      </div>
    </div>
  );
}
