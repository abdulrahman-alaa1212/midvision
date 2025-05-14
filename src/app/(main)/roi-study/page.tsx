
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Stepper } from "@/components/common/stepper";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Brain, User } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const useCaseEnum = z.enum([
  "Training & Onboarding", 
  "Maintenance & Repair", 
  "Logistics & Warehousing", 
  "Design & Prototyping", 
  "Sales & Marketing", 
  "Other"
]);

const copilotModeEnum = z.enum(["ai", "custom"]);

const projectInfoSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  projectDescription: z.string().optional(),
  useCase: useCaseEnum.describe("The primary use case for the AR/MR project."),
  copilotMode: copilotModeEnum.describe("Select ROI Copilot mode: AI-assisted or Custom input."),
});

const investmentCostsSchema = z.object({
  hardwareCost: z.coerce.number().min(0, "Hardware cost must be positive.").default(0),
  softwareCost: z.coerce.number().min(0, "Software cost must be positive.").default(0),
  trainingCost: z.coerce.number().min(0, "Training cost must be positive.").default(0),
  otherCosts: z.coerce.number().min(0, "Other costs must be positive.").default(0),
});

const expectedBenefitsSchema = z.object({
  efficiencyGains: z.coerce.number().min(0, "Efficiency gains must be positive.").default(0),
  errorReduction: z.coerce.number().min(0, "Error reduction savings must be positive.").default(0),
  newRevenue: z.coerce.number().min(0, "New revenue must be positive.").default(0),
  otherBenefits: z.coerce.number().min(0, "Other benefits must be positive.").default(0),
});

// This discriminated union helps manage different validation schemas per step.
// We'll primarily validate the current step's schema.
const wizardSchema = z.discriminatedUnion("step", [
  z.object({ step: z.literal(0) }).merge(projectInfoSchema),
  z.object({ step: z.literal(1) }).merge(investmentCostsSchema),
  z.object({ step: z.literal(2) }).merge(expectedBenefitsSchema),
  z.object({ step: z.literal(3) }), // Summary step, no new fields specific to this step's schema
]);

type WizardFormValues = z.infer<typeof projectInfoSchema> & 
                        z.infer<typeof investmentCostsSchema> & 
                        z.infer<typeof expectedBenefitsSchema> & 
                        { step: number };


const stepsConfig = [
  { title: "Project Setup", description: "Define your project and choose Copilot mode." },
  { title: "Investments", description: "Detail the costs involved." },
  { title: "Benefits", description: "Estimate the expected benefits." },
  { title: "Summary & Report", description: "Review and generate your ROI report." },
];

export default function RoiStudyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [roiResult, setRoiResult] = useState<{ roi: number; paybackPeriod: number; annualSavings: number; mode: 'ai' | 'custom' } | null>(null);
  const { toast } = useToast();

  const methods = useForm<WizardFormValues>({
    resolver: zodResolver(
      currentStep === 0 ? projectInfoSchema :
      currentStep === 1 ? investmentCostsSchema :
      currentStep === 2 ? expectedBenefitsSchema :
      z.object({}) // For summary step, rely on previous validations
    ),
    defaultValues: {
      step: 0,
      projectName: "",
      projectDescription: "",
      useCase: "Training & Onboarding",
      copilotMode: "custom",
      hardwareCost: 0,
      softwareCost: 0,
      trainingCost: 0,
      otherCosts: 0,
      efficiencyGains: 0,
      errorReduction: 0,
      newRevenue: 0,
      otherBenefits: 0,
    },
    mode: "onChange", 
  });

  const { handleSubmit, trigger, getValues, watch, formState: {isValid} } = methods;
  const selectedCopilotMode = watch("copilotMode");

  const handleNext = async () => {
    const fieldsToValidate = currentStep === 0 ? Object.keys(projectInfoSchema.shape) as (keyof WizardFormValues)[] :
                             currentStep === 1 ? Object.keys(investmentCostsSchema.shape) as (keyof WizardFormValues)[] :
                             currentStep === 2 ? Object.keys(expectedBenefitsSchema.shape) as (keyof WizardFormValues)[] : [];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < stepsConfig.length - 1) {
      setCurrentStep(currentStep + 1);
      methods.setValue("step" as any, currentStep + 1); 
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      methods.setValue("step" as any, currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<WizardFormValues> = async (data) => {
    if (currentStep === stepsConfig.length - 1) { // Final step (Summary)
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      const values = getValues();
      const currentMode = values.copilotMode || 'custom';

      if (currentMode === 'ai') {
        // Placeholder for AI mode submission and report generation
        // This would typically involve calling a server action that interacts with n8n/AI backend
        setRoiResult({
          roi: Math.random() * 100, // Dummy data
          paybackPeriod: Math.random() * 5, // Dummy data
          annualSavings: Math.random() * 50000, // Dummy data
          mode: 'ai',
        });
        toast({
          title: "AI Report Generation Initiated!",
          description: "Your AI-powered report is being generated.",
        });
      } else { // Custom mode
        const totalInvestment = (values.hardwareCost || 0) + (values.softwareCost || 0) + (values.trainingCost || 0) + (values.otherCosts || 0);
        const totalAnnualBenefit = (values.efficiencyGains || 0) + (values.errorReduction || 0) + (values.newRevenue || 0) + (values.otherBenefits || 0);

        if (totalInvestment === 0 && totalAnnualBenefit === 0) {
           toast({
            title: "Calculation Error",
            description: "Please provide some investment or benefit values for custom mode.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const roi = totalInvestment > 0 ? ((totalAnnualBenefit - totalInvestment) / totalInvestment) * 100 : (totalAnnualBenefit > 0 ? Infinity : 0);
        const paybackPeriod = totalAnnualBenefit > 0 ? totalInvestment / totalAnnualBenefit : Infinity;
        
        setRoiResult({
          roi: parseFloat(roi.toFixed(2)),
          paybackPeriod: parseFloat(paybackPeriod.toFixed(2)),
          annualSavings: totalAnnualBenefit,
          mode: 'custom',
        });
        toast({
          title: "Custom ROI Calculated!",
          description: "Your AR/MR project ROI has been estimated.",
        });
      }
      setIsComplete(true);
      setIsLoading(false);
    } else {
      handleNext();
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Project Setup
        return (
          <>
            <FormField
              control={methods.control}
              name="copilotMode"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">ROI Copilot Mode</FormLabel>
                  <FormDescription>Choose how you want to calculate ROI. AI mode will leverage AI for market insights (future feature).</FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="custom" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                          <User className="mr-2 h-5 w-5 text-primary" /> Custom Mode (Manual Input)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ai" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center">
                           <Brain className="mr-2 h-5 w-5 text-accent" /> AI Mode (AI-Assisted Analysis)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={methods.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., AR Maintenance Assistant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Use Case</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a use case" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {useCaseEnum.options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe the project and its goals. This will be helpful if using AI mode." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 1: // Investment Costs
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={methods.control} name="hardwareCost" render={({ field }) => (
                <FormItem>
                  <FormLabel>Hardware Cost ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={methods.control} name="softwareCost" render={({ field }) => (
                <FormItem>
                  <FormLabel>Software Cost ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={methods.control} name="trainingCost" render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Cost ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={methods.control} name="otherCosts" render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Costs ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                  <FormDescription>Implementation, maintenance, etc.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2: // Expected Benefits
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField control={methods.control} name="efficiencyGains" render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Efficiency Gains ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                   <FormDescription>E.g., time savings, productivity increase.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={methods.control} name="errorReduction" render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Error Reduction Savings ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={methods.control} name="newRevenue" render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual New Revenue ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                   <FormDescription>Additional revenue generated by the project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={methods.control} name="otherBenefits" render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Annual Benefits ($)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                   <FormDescription>E.g., improved safety, compliance.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 3: // Summary & Report
        const values = getValues();
        const totalInvestment = (values.hardwareCost || 0) + (values.softwareCost || 0) + (values.trainingCost || 0) + (values.otherCosts || 0);
        const totalAnnualBenefit = (values.efficiencyGains || 0) + (values.errorReduction || 0) + (values.newRevenue || 0) + (values.otherBenefits || 0);
        
        if (values.copilotMode === 'ai') {
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Project: {values.projectName || "N/A"} (AI Mode)</h3>
              <p className="text-sm text-muted-foreground">Use Case: {values.useCase || "N/A"}</p>
              {values.projectDescription && <p className="text-muted-foreground">{values.projectDescription}</p>}
              
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertTitle>AI Copilot Analysis</AlertTitle>
                <AlertDescription>
                  In AI Mode, the system will perform deep market research, competitor benchmarking, and vendor analysis.
                  The insights gathered will be used to refine benefit estimations and provide a comprehensive report.
                  <br /><br />
                  <span className="font-semibold">(This section will display AI insights and chain-of-thought reasoning in a future update.)</span>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Total Investment (User Input):</p>
                  <p className="text-lg font-bold text-destructive">${totalInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium">Total Annual Benefit (User Estimate):</p>
                  <p className="text-lg font-bold text-[hsl(var(--metric-positive))]">${totalAnnualBenefit.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Click "Generate AI-Powered Report" to process your inputs with AI analysis for a detailed feasibility study.
              </p>
            </div>
          );
        }
        // Custom Mode Summary
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project: {values.projectName || "N/A"} (Custom Mode)</h3>
            <p className="text-sm text-muted-foreground">Use Case: {values.useCase || "N/A"}</p>
            {values.projectDescription && <p className="text-muted-foreground">{values.projectDescription}</p>}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Total Investment:</p>
                <p className="text-lg font-bold text-destructive">${totalInvestment.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-medium">Total Annual Benefit:</p>
                <p className="text-lg font-bold text-[hsl(var(--metric-positive))]">${totalAnnualBenefit.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Based on the data provided. Click "Calculate Custom ROI" to see the results.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (isComplete && roiResult) {
    const allValues = getValues();
    const reportTitle = roiResult.mode === 'ai' ? "AI-Powered Report Generated!" : "Custom ROI Calculation Complete!";
    const resultDescription = roiResult.mode === 'ai' 
      ? "AI analysis has been incorporated into your results (simulated)." 
      : `Project: ${allValues.projectName || "N/A"} | Use Case: ${allValues.useCase || "N/A"}`;

    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl">{reportTitle}</CardTitle>
            <CardDescription>{resultDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
             {roiResult.mode === 'ai' && (
              <Alert variant="default" className="text-left">
                <Brain className="h-4 w-4" />
                <AlertTitle>AI Insights Summary (Placeholder)</AlertTitle>
                <AlertDescription>
                  Your detailed report includes market analysis, vendor recommendations, and transparent AI reasoning.
                  <ul className="list-disc pl-5 mt-2 text-xs">
                    <li>Simulated Market Trend: Positive growth in AR for {allValues.useCase}.</li>
                    <li>Simulated Top Vendor: "AR Solutions Inc." (Details in full report)</li>
                    <li>Simulated Key Insight: Efficiency gains could be up to {(roiResult.annualSavings / (allValues.hardwareCost || 1) * 0.2).toFixed(0)}% higher with optimized software.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Overall ROI</p>
              <p className="text-4xl font-bold text-[hsl(var(--metric-positive))]">
                {isFinite(roiResult.roi) ? `${roiResult.roi.toFixed(2)}%` : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annual Savings</p>
              <p className="text-3xl font-bold">${roiResult.annualSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-3xl font-bold">
                {isFinite(roiResult.paybackPeriod) ? `${roiResult.paybackPeriod.toFixed(2)} Years` : "N/A"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button size="lg" onClick={() => {setIsComplete(false); setRoiResult(null); setCurrentStep(0); methods.reset();}}>
              Start New Study
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">ROI Input Wizard</h1>
        <p className="text-muted-foreground">
          Follow the steps to enter your project data and calculate ROI using your preferred mode.
        </p>
      </header>
      
      <Stepper steps={stepsConfig} currentStep={currentStep} onStepClick={(step) => {
          const targetStep = step;
          const attemptNavigation = async () => {
            if (targetStep < currentStep) {
              setCurrentStep(targetStep);
              methods.setValue("step" as any, targetStep);
              return;
            }
            // Validate all steps from current up to target - 1
            for (let i = currentStep; i < targetStep; i++) {
              const fieldsToValidateOnStepI = i === 0 ? Object.keys(projectInfoSchema.shape) as (keyof WizardFormValues)[] :
                                             i === 1 ? Object.keys(investmentCostsSchema.shape) as (keyof WizardFormValues)[] :
                                             i === 2 ? Object.keys(expectedBenefitsSchema.shape) as (keyof WizardFormValues)[] : [];
              const isIntermediaryStepValid = await trigger(fieldsToValidateOnStepI);
              if (!isIntermediaryStepValid) {
                setCurrentStep(i); // Stay on the first invalid step
                methods.setValue("step" as any, i);
                return;
              }
            }
            // All intermediate steps are valid, proceed to targetStep
            setCurrentStep(targetStep);
            methods.setValue("step" as any, targetStep);
          };
          attemptNavigation();
      }} className="mb-12" />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>{stepsConfig[currentStep].title}</CardTitle>
              <CardDescription>{stepsConfig[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[250px]">
              {renderStepContent()}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isLoading}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="submit" disabled={isLoading || (currentStep < stepsConfig.length -1 && !isValid )}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentStep === stepsConfig.length - 1 
                  ? (isLoading 
                      ? "Processing..." 
                      : (selectedCopilotMode === 'ai' ? "Generate AI-Powered Report" : "Calculate Custom ROI"))
                  : "Next"}
                {currentStep < stepsConfig.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}
    
