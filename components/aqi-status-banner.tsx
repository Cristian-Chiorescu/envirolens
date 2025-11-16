// components/AQIStatusBanner.tsx

interface AQIStatusBannerProps {
  aqi: number;
  status: string;
}

export default function AQIStatusBanner({ aqi, status }: AQIStatusBannerProps) {
  // Determine background color based on AQI value
  const bgColor =
    aqi <= 50
      ? "bg-secondary/10 border-secondary/20"
      : aqi <= 100
      ? "bg-accent/10 border-accent/20"
      : "bg-destructive/10 border-destructive/20";

  // Determine icon based on AQI value
  const icon = aqi <= 50 ? "✓" : "⚠";

  // Get health message based on AQI value
  const getMessage = () => {
    if (aqi <= 50) {
      return "Air quality is satisfactory, and air pollution poses little or no risk. Outdoor activities are safe for all groups.";
    }
    if (aqi <= 100) {
      return "Air quality is acceptable. However, sensitive individuals should consider limiting prolonged outdoor exertion.";
    }
    return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
  };

  return (
    <div className={`rounded-xl border p-6 ${bgColor}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-background/50 border border-accent-foreground/20 flex items-center justify-center shrink-0">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{status} Air Quality</h3>
          <p className="text-sm text-muted-foreground">{getMessage()}</p>
        </div>
      </div>
    </div>
  );
}
