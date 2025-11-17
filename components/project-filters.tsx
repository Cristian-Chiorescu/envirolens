interface ProjectFiltersProps {
  selectedSector: string;
  selectedRegulation: string;
  onSectorChange: (sector: string) => void;
  onRegulationChange: (regulation: string) => void;
}

export default function ProjectFilters({
  selectedSector,
  selectedRegulation,
  onSectorChange,
  onRegulationChange,
}: ProjectFiltersProps) {
  const sectors = [
    "All",
    "Oil & Gas",
    "Mining",
    "Hydrogen",
    "Clean Fuels",
    "Manufacturing",
  ];
  const regulations = ["All", "TIER", "OBPS", "NPRI", "EPEA"];

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Regulation
          </label>
          <select
            value={selectedRegulation}
            onChange={(e) => onRegulationChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
          >
            {regulations.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
