import Image from "next/image";
import CTAButton from "@/components/cta-button";
import HomeFeatureCards from "@/components/home-feature-cards";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex justify-center mb-8">
              <Image
                src="/envirolens-logo.png"
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
          </div>
          <CTAButton></CTAButton>

          <HomeFeatureCards></HomeFeatureCards>

          <div className="bg-secondary/10 border border-border rounded-xl p-8 text-center">
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
