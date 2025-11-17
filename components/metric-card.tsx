interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
  color?: "primary" | "accent" | "secondary" | "default";
}

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  color = "default",
}: MetricCardProps) {
  const colorClasses = {
    primary: "border-primary/20 bg-primary/5",
    accent: "border-accent/20 bg-accent/5",
    secondary: "border-secondary/20 bg-secondary/5",
    default: "border-border bg-card",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    stable: "→",
  };

  return (
    <div
      className={`rounded-xl border p-6 ${colorClasses[color]} transition-all duration-200 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {trend && (
          <span className="text-2xl opacity-50">{trendIcons[trend]}</span>
        )}
      </div>
    </div>
  );
}
