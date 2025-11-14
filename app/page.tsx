import Link from "next/link";
import Image from "next/image";
import { GET } from "./api/air-quality/route";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            {/* replace full logo with just icon logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/envirolens-logo-full.png"
                alt="EnviroLens Logo"
                width={120}
                height={120}
                className="drop-shadow-lg"
                priority
              ></Image>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6">
              EnviroLens
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-light">
              Environmental Data Intelligence for Calgary
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto">
              Real-time air quality monitoring with AI-powered compliance
              insights
            </p>
            <div> {} </div>
          </div>
          {/*replace CTA Link styling with shacn button and replace svg with lucide icon*/}
          <div className="flex justify-center mb-20">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-foreground bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">View Live Dashboard</span>
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-40 duration-300"></div>
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </Link>
          </div>
          {/* Feature Cards. Replace with shadcn cards and replace svgs with lucide icons*/}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="group bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Live Data
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time Calgary air quality metrics from monitoring stations
                across the city
              </p>
            </div>

            <div className="group bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-lg hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                AI Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Natural language explanations of environmental trends and
                regulatory implications
              </p>
            </div>

            <div className="group bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-lg hover:border-secondary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                Compliance Context
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect environmental data to Alberta regulations like TIER,
                EPEA, and NPRI
              </p>
            </div>
          </div>

          {/* Bottom Info Section. Also replace with shadcn card*/}
          <div className="bg-muted/50 border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Built for Environmental Consultants
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              EnviroLens combines live environmental monitoring with AI-powered
              analysis to help consultants make faster, more informed decisions
              about compliance and risk assessment.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
