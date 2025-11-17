export default function RegulatoryContext() {
  const regulations = [
    {
      title: "Alberta TIER",
      description:
        "Technology Innovation and Emissions Reduction regulation applies to facilities emitting ≥100,000 tonnes CO₂e annually",
    },
    {
      title: "Federal OBPS",
      description:
        "Output-Based Pricing System applies to industrial facilities in Alberta meeting federal thresholds",
    },
    {
      title: "NPRI Reporting",
      description:
        "National Pollutant Release Inventory requires annual reporting of pollutant releases and transfers",
    },
  ];

  return (
    <div className="bg-muted/50 border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        Regulatory Context
      </h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        {regulations.map((reg) => (
          <div key={reg.title}>
            <p className="font-medium text-foreground mb-1">{reg.title}</p>
            <p className="text-muted-foreground">{reg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
