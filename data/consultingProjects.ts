// data/consultingProjects.ts

export interface ConsultingProject {
  id: string;
  title: string;
  client: string; // Anonymized
  sector: "Oil & Gas" | "Mining" | "Hydrogen" | "Clean Fuels" | "Manufacturing";
  jurisdiction: "Alberta" | "BC" | "Federal";
  serviceArea:
    | "Emissions Reporting"
    | "Regulatory Pathway"
    | "Energy Management"
    | "Sustainability Disclosure";
  tags: string[]; // TIER, OBPS, NPRI, etc.
  relevantAQIRange: string; // e.g., "0-50" or "50-100"
  problemSummary: string;
  approachSummary: string;
  outcome: string;
  lessonsLearned: string;
  completedDate: string;
}

export const consultingProjects: ConsultingProject[] = [
  {
    id: "proj-001",
    title: "TIER Baseline Emissions Assessment",
    client: "Oil & Gas Facility - Central Alberta",
    sector: "Oil & Gas",
    jurisdiction: "Alberta",
    serviceArea: "Emissions Reporting",
    tags: ["TIER", "GHG", "Baseline"],
    relevantAQIRange: "0-50", // Good air quality - normal operations
    problemSummary:
      "New facility required establishment of baseline emissions for TIER compliance under Alberta's Technology Innovation and Emissions Reduction regulation.",
    approachSummary:
      "Conducted comprehensive emissions inventory across all sources. Implemented continuous emissions monitoring systems (CEMS) for major point sources. Developed robust data management protocols for annual reporting.",
    outcome:
      "Successfully established baseline 15% below industry average. Client achieved compliance and qualified for performance credits in first reporting year.",
    lessonsLearned:
      "Early engagement with regulatory specialists critical. Air quality monitoring data proved essential for validating emissions calculations during stable atmospheric conditions.",
    completedDate: "2024-03",
  },
  {
    id: "proj-002",
    title: "NPRI Compliance & Air Quality Monitoring",
    client: "Mining Operation - Northern Alberta",
    sector: "Mining",
    jurisdiction: "Federal",
    serviceArea: "Emissions Reporting",
    tags: ["NPRI", "PM2.5", "Air Quality"],
    relevantAQIRange: "50-100", // Moderate air quality - increased scrutiny
    problemSummary:
      "Mining operation faced increased scrutiny due to elevated PM2.5 levels during moderate air quality days. Required enhanced NPRI reporting and mitigation strategies.",
    approachSummary:
      "Installed additional ambient air quality monitors at property boundary. Implemented dust suppression protocols triggered by real-time air quality thresholds. Enhanced NPRI reporting to include episodic events.",
    outcome:
      "Reduced reportable PM2.5 releases by 30%. Demonstrated proactive environmental management to regulators and community stakeholders.",
    lessonsLearned:
      "Real-time air quality monitoring enables adaptive management. Moderate AQI days require heightened operational awareness and communication protocols.",
    completedDate: "2024-06",
  },
  {
    id: "proj-003",
    title: "Hydrogen Facility Environmental Pathway",
    client: "Hydrogen Production - Calgary Region",
    sector: "Hydrogen",
    jurisdiction: "Alberta",
    serviceArea: "Regulatory Pathway",
    tags: ["TIER", "EPEA", "Net Zero"],
    relevantAQIRange: "0-50", // Good air quality - new facility planning
    problemSummary:
      "New hydrogen production facility needed comprehensive regulatory approval pathway including TIER registration and EPEA approval.",
    approachSummary:
      "Developed integrated regulatory strategy addressing air quality permitting, GHG management, and water use. Coordinated multi-stakeholder engagement including Alberta Environment and Parks.",
    outcome:
      "Secured all required approvals 6 months ahead of schedule. Facility positioned as lowest carbon-intensity hydrogen producer in region.",
    lessonsLearned:
      "Clean air quality data strengthened regulatory applications. Proactive ambient monitoring during planning phase demonstrated environmental responsibility.",
    completedDate: "2024-08",
  },
  {
    id: "proj-004",
    title: "Wildfire Smoke Impact Assessment",
    client: "Industrial Facility - Southern Alberta",
    sector: "Manufacturing",
    jurisdiction: "Alberta",
    serviceArea: "Emissions Reporting",
    tags: ["Air Quality", "EPEA", "Emergency Response"],
    relevantAQIRange: "100-200", // Unhealthy air quality - operational impacts
    problemSummary:
      "Facility operations during wildfire smoke events created compliance uncertainty. Needed protocol for differentiating facility emissions from ambient smoke impacts.",
    approachSummary:
      "Developed episodic event protocols aligned with EPEA requirements. Implemented enhanced monitoring to distinguish facility vs. wildfire contributions. Created decision framework for operational adjustments.",
    outcome:
      "Maintained compliance during unprecedented smoke events. Protocol adopted as industry best practice by regional facilities.",
    lessonsLearned:
      "Poor air quality days require clear operational protocols. Real-time data differentiation between sources is critical for regulatory defensibility.",
    completedDate: "2023-08",
  },
  {
    id: "proj-005",
    title: "OBPS Compliance Strategy",
    client: "Clean Fuels Facility - Alberta",
    sector: "Clean Fuels",
    jurisdiction: "Federal",
    serviceArea: "Emissions Reporting",
    tags: ["OBPS", "Federal", "Carbon Pricing"],
    relevantAQIRange: "0-100", // Good to moderate - normal operations
    problemSummary:
      "Facility met federal Output-Based Pricing System thresholds. Required assessment of compliance strategy vs. provincial TIER requirements.",
    approachSummary:
      "Conducted detailed emissions intensity analysis under both frameworks. Modeled credit generation scenarios. Developed hybrid compliance strategy leveraging both systems.",
    outcome:
      "Optimized compliance approach saving $850K annually. Positioned facility for future carbon market opportunities.",
    lessonsLearned:
      "Air quality monitoring data valuable for demonstrating operational consistency across reporting periods. Clean air quality conditions correlate with optimal operational efficiency.",
    completedDate: "2024-01",
  },
  {
    id: "proj-006",
    title: "Sustainability Disclosure Framework",
    client: "Multi-Site Industrial Operator",
    sector: "Oil & Gas",
    jurisdiction: "Alberta",
    serviceArea: "Sustainability Disclosure",
    tags: ["ESG", "Disclosure", "Air Quality"],
    relevantAQIRange: "0-50", // Good air quality - corporate reporting
    problemSummary:
      "Operator needed enhanced environmental disclosure for investors. Required integration of air quality performance into ESG framework.",
    approachSummary:
      "Developed comprehensive environmental performance dashboard. Integrated real-time air quality data with operational metrics. Created investor-grade disclosure aligned with TCFD recommendations.",
    outcome:
      "Improved ESG ratings from two major agencies. Enhanced stakeholder confidence through transparent environmental performance reporting.",
    lessonsLearned:
      "Strong air quality performance is valuable stakeholder communication tool. Good AQI conditions demonstrate operational excellence and environmental stewardship.",
    completedDate: "2024-10",
  },
];
