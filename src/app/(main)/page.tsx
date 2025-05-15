
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3, FileText, Search, Zap, Target, Lightbulb, Users, Presentation, ActivitySquare, GraduationCap, HeartHandshake, DollarSign, Workflow, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-zinc-900/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_650px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">
                  AR/MR ROI Feasibility Deep Searcher for Healthcare
                </h1>
                <p className="max-w-[650px] text-muted-foreground md:text-xl leading-relaxed">
                  Empower hospital decision-makers to assess the financial and time-saving benefits of integrating Augmented and Mixed Reality technologies. Our easy-to-use web application helps you quickly evaluate potential gains, leveraging AI to deliver comprehensive, customized feasibility analyses—even if you don’t have highly precise numerical data.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5">
                  <Link href="/roi-study">
                    Start Feasibility Study <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-0.5 border-border hover:bg-accent/10">
                  <Link href="/dashboard">
                    Explore Dashboard <BarChart3 className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/650x450.png"
              width="650"
              height="450"
              alt="AR/MR technology in a futuristic healthcare setting"
              data-ai-hint="healthcare technology"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-[4/3] shadow-2xl border-2 border-accent/20"
              priority
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow">
              Core Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Unlock Insightful AR/MR Feasibility Analysis
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers powerful tools to guide your healthcare technology investments with clarity and confidence.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
            <FeatureCard
              icon={<FileText className="h-12 w-12 text-accent" />}
              title="Interactive Data Input"
              description="A guided, multi-step wizard makes it simple for non-technical hospital managers to input scenario data for precise ROI calculations."
              href="/roi-study"
            />
            <FeatureCard
              icon={<BarChart3 className="h-12 w-12 text-accent" />}
              title="Visualize Potential Gains"
              description="Instantly visualize key ROI metrics, financial benefits, and time savings to understand the tangible impact of AR/MR in your facility."
              href="/dashboard"
            />
            <FeatureCard
              icon={<Search className="h-12 w-12 text-accent" />}
              title="AI-Powered Deep Search"
              description="Leverage our AI agent for comprehensive feasibility analysis. Access relevant documentation and insights on AR/MR in healthcare to support your assessment."
              href="/ai-search"
            />
          </div>
        </div>
      </section>

      {/* How Our Tool Transforms Healthcare Decision-Making Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50 dark:bg-zinc-900/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow">
              Streamlined Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              From Data to Decision, Effortlessly
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how our intuitive platform simplifies complex AR/MR feasibility studies for healthcare.
            </p>
          </div>

          <div className="grid gap-12 md:gap-16">
            {/* Step 1 */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Step 1</div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Easy & Guided Data Input</h3>
                <p className="text-muted-foreground md:text-lg">
                  Our user-friendly wizard guides you through entering project specifics, operational data, and cost factors. Choose between custom inputs or AI-assisted defaults to get started quickly.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Define project scope and use case.</li>
                  <li>Input investment costs (hardware, software, training).</li>
                  <li>Estimate potential benefits and savings.</li>
                </ul>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Screenshot of the data input wizard"
                data-ai-hint="data input interface"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg border border-border"
              />
            </div>

            {/* Step 2 */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="order-last lg:order-first space-y-4">
                 <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Step 2</div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">AI-Powered Market Analysis</h3>
                <p className="text-muted-foreground md:text-lg">
                  Opt for AI Copilot mode to unlock deep market insights. Our AI agent researches relevant documentation, benchmarks, and potential vendor solutions, enriching your feasibility study.
                </p>
                 <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Automated search for AR/MR healthcare studies.</li>
                  <li>Insights into industry trends and best practices.</li>
                  <li>Transparent reasoning behind AI findings.</li>
                </ul>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Abstract representation of AI analysis"
                data-ai-hint="artificial intelligence abstract"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg border border-border"
              />
            </div>

            {/* Step 3 */}
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Step 3</div>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Clear, Actionable ROI Reports</h3>
                <p className="text-muted-foreground md:text-lg">
                  Receive a comprehensive report visualizing your potential ROI, payback period, and annual savings. The interactive dashboard allows you to explore metrics and understand the full financial picture.
                </p>
                 <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Key financial indicators at a glance.</li>
                  <li>Charts comparing costs and benefits.</li>
                  <li>Data-driven support for your investment decisions.</li>
                </ul>
              </div>
               <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Dashboard showing ROI charts and metrics"
                data-ai-hint="dashboard interface charts"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg border border-border"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Unlock the Potential Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow">
              Healthcare Advantages
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why AR/MR is a Game-Changer for Healthcare
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Augmented and Mixed Reality technologies are not just futuristic concepts; they are practical tools delivering real-world benefits to healthcare facilities today.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon={<ActivitySquare className="w-10 h-10 text-accent" />}
              title="Enhanced Surgical Precision"
              description="Overlay vital information directly onto the surgical field, improving accuracy and patient outcomes."
            />
            <BenefitCard
              icon={<GraduationCap className="w-10 h-10 text-accent" />}
              title="Revolutionized Medical Training"
              description="Provide immersive, hands-on training simulations for complex procedures without risking patient safety."
            />
            <BenefitCard
              icon={<HeartHandshake className="w-10 h-10 text-accent" />}
              title="Streamlined Patient Care"
              description="Improve diagnostics, patient education, and remote consultations with interactive AR/MR tools."
            />
            <BenefitCard
              icon={<DollarSign className="w-10 h-10 text-accent" />}
              title="Reduced Operational Costs"
              description="Optimize workflows, reduce errors, and shorten procedure times, leading to significant cost savings."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-t from-background to-muted/50 dark:from-background dark:to-zinc-900/30">
        <div className="container px-4 md:px-6 text-center">
          <Zap className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Ready to Discover Your AR/MR Potential?
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mb-8">
            Stop guessing and start calculating. Our AR/MR ROI Feasibility Deep Searcher provides the clarity you need to make confident, data-driven decisions for your healthcare facility.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-0.5 px-10 py-6 text-lg">
            <Link href="/roi-study">
              Start Your Free Feasibility Study Now <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
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
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col bg-card h-full">
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <span className="mt-1 p-3 bg-accent/10 rounded-full">{icon}</span>
        <CardTitle className="text-xl md:text-2xl mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 text-accent hover:text-accent/80 font-semibold text-base">
          <Link href={href}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="p-4 bg-accent/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
