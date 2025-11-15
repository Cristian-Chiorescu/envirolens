import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FeatureCard } from "@/app/types";
import { ChartColumnBig, Lightbulb, FileText } from "lucide-react";

const featureCardList: FeatureCard[] = [
  {
    icon: <ChartColumnBig></ChartColumnBig>,
    color: "primary",

    title: "Live Data",
    description:
      "Real-time Calgary air quality metrics from monitoring stations across the city",
  },
  {
    icon: <Lightbulb></Lightbulb>,
    color: "accent",

    title: "AI Insights",
    description:
      "Natural language explanations of environmental trends and regulatory implications",
  },
  {
    icon: <FileText></FileText>,
    color: "secondary",

    title: "Compliance Context",
    description:
      "Connect environmental data to Alberta regulations like TIER, EPEA, and NPRI",
  },
];

export default function HomeFeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-16">
      {featureCardList.map((feature, i) => {
        return (
          <Card
            key={i}
            className="p-8 group hover:border-primary/50 hover:shadow-lg transition-all duration-300 gap-4"
          >
            {/*change hover effects*/}
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors bg-${feature.color}/10 text-${feature.color} `}
            >
              {feature.icon}
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              {feature.description}
            </CardDescription>
          </Card>
        );
      })}
    </div>
  );
}
