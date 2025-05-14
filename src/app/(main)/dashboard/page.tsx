import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Percent, TrendingUp, CalendarClock, AlertTriangle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import Image from "next/image";

const roiData = [
  { month: "Jan", roi: 10, savings: 5000 },
  { month: "Feb", roi: 12, savings: 6000 },
  { month: "Mar", roi: 15, savings: 7500 },
  { month: "Apr", roi: 13, savings: 6500 },
  { month: "May", roi: 18, savings: 9000 },
  { month: "Jun", roi: 20, savings: 10000 },
];

const paybackData = [
  { name: "Investment", value: 50000 },
  { name: "Cumulative Savings", value: 30000 },
];
const COLORS = ["hsl(var(--muted))", "hsl(var(--accent))"];


const chartConfig = {
  roi: {
    label: "ROI (%)",
    color: "hsl(var(--chart-2))",
  },
  savings: {
    label: "Annual Savings ($)",
    color: "hsl(var(--chart-1))",
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">ROI Dashboard</h1>
        <p className="text-muted-foreground">
          Key metrics and visualizations for your AR/MR projects.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Overall ROI"
          value="25.6%"
          description="+5.2% from last month"
          icon={Percent}
          metricType="positive"
        />
        <MetricCard
          title="Annual Savings"
          value="$125,340"
          description="Projected for this year"
          icon={DollarSign}
          metricType="positive"
        />
        <MetricCard
          title="Payback Period"
          value="1.8 Years"
          description="Average payback time"
          icon={CalendarClock}
          metricType="neutral"
        />
        <MetricCard
          title="Active Projects"
          value="3"
          description="1 requires attention"
          icon={TrendingUp}
          metricType="neutral"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>ROI & Savings Over Time</CardTitle>
            <CardDescription>Monthly trend of ROI percentage and annual savings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={roiData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="savings" fill="var(--color-savings)" yAxisId="left" radius={4} />
                <Bar dataKey="roi" fill="var(--color-roi)" yAxisId="right" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payback Period Breakdown</CardTitle>
            <CardDescription>Visualization of investment vs. cumulative savings.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
             <ChartContainer config={{}} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie data={paybackData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {paybackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Project Highlights</CardTitle>
             <CardDescription>Quick overview of ongoing projects.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Manufacturing AR Assist</CardTitle>
                <span className="text-sm text-[hsl(var(--metric-positive))]">On Track</span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">ROI: 35%, Est. Savings: $80k/year</p>
                <Image src="https://placehold.co/300x150.png" alt="Project A" data-ai-hint="manufacturing augmented-reality" width={300} height={150} className="rounded-md object-cover"/>
              </CardContent>
            </Card>
            <Card className="border-destructive/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Retail MR Experience</CardTitle>
                 <span className="text-sm text-[hsl(var(--metric-negative))] flex items-center"><AlertTriangle className="w-4 h-4 mr-1"/>Needs Review</span>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">ROI: -5%, Est. Savings: $10k/year (Below Target)</p>
                 <Image src="https://placehold.co/300x150.png" alt="Project B" data-ai-hint="retail mixed-reality" width={300} height={150} className="rounded-md object-cover"/>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
