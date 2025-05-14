
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, FileText, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">
                  AR/MR ROI Feasibility Deep Searcher for Healthcare
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                  Empower hospital decision-makers to assess the financial and time-saving benefits of integrating Augmented and Mixed Reality technologies. Our easy-to-use web application helps you quickly evaluate potential gains, leveraging AI to deliver comprehensive, customized feasibility analyses—even if you don’t have highly precise numerical data.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-shadow">
                  <Link href="/roi-study">
                    Start Feasibility Study <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow hover:shadow-md transition-shadow">
                  <Link href="/dashboard">
                    Explore Dashboard <BarChart3 className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="AR/MR technology in a healthcare setting"
              data-ai-hint="healthcare technology"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg border border-border"
              priority
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground shadow-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Tools for Healthcare Innovation
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Leverage our comprehensive suite of features to make informed decisions about your AR/MR investments in healthcare.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-accent" />}
              title="Interactive Data Input"
              description="Guided multi-step wizard for easy scenario and data entry, enabling non-technical hospital managers to quickly input information for ROI calculation."
              href="/roi-study"
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-accent" />}
              title="Visualize Potential Gains"
              description="Visualize key ROI metrics, financial gains, and time savings, helping you understand the potential impact of AR/MR in your healthcare setting."
              href="/dashboard"
            />
            <FeatureCard
              icon={<Search className="h-10 w-10 text-accent" />}
              title="AI-Powered Analysis"
              description="Leverage AI for a comprehensive feasibility analysis. Find relevant documentation and insights on AR/MR in healthcare to support your assessment."
              href="/ai-search"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <span className="mt-1">{icon}</span>
        <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 text-accent hover:text-accent/80 font-semibold">
          <Link href={href}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
