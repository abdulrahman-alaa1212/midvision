
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
import { Stepper } from "@/components/common/stepper";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const useCaseEnum = z.enum([
  "Training & Onboarding", 
  "Maintenance & Repair", 
  "Logistics & Warehousing", 
  "Design & Prototyping", 
  "Sales & Marketing", 
  "Other"
]);

const projectInfoSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  projectDescription: z.string().optional(),
  useCase: useCaseEnum.describe("The primary use case for the AR/MR project."),
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

const wizardSchema = z.discriminatedUnion("step", [
  z.object({ step: z.literal(0) }).merge(projectInfoSchema),
  z.object({ step: z.literal(1) }).merge(investmentCostsSchema),
  z.object({ step: z.literal(2) }).merge(expectedBenefitsSchema),
  z.object({ step: z.literal(3) }), // Summary step, no new fields
]);

type WizardFormValues = z.infer<typeof wizardSchema>;

const stepsConfig = [
  { title: "Project Info", description: "Tell us about your project." },
  { title: "Investments", description: "Detail the costs involved." },
  { title: "Benefits", description: "Estimate the expected benefits." },
  { title: "Summary", description: "Review and calculate ROI." },
];

export default function RoiStudyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [roiResult, setRoiResult] = useState<{ roi: number; paybackPeriod: number; annualSavings: number } | null>(null);
  const { toast } = useToast();

  const methods = useForm<WizardFormValues>({
    resolver: zodResolver(
      currentStep === 0 ? projectInfoSchema :
      currentStep === 1 ? investmentCostsSchema :
      currentStep === 2 ? expectedBenefitsSchema :
      z.object({}) // No validation for summary step, form is already validated
    ),
    defaultValues: {
      step: 0,
      projectName: "",
      projectDescription: "",
      useCase: "Training & Onboarding",
      hardwareCost: 0,
      softwareCost: 0,
      trainingCost: 0,
      otherCosts: 0,
      efficiencyGains: 0,
      errorReduction: 0,
      newRevenue: 0,
      otherBenefits: 0,
    },
    mode: "onChange", // Validate on change for better UX
  });

  const { handleSubmit, trigger, getValues, formState: {isValid} } = methods;

  const handleNext = async () => {
    const isStepValid = await trigger();
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const values = getValues(); 
      const totalInvestment = (values.hardwareCost || 0) + (values.softwareCost || 0) + (values.trainingCost || 0) + (values.otherCosts || 0);
      const totalAnnualBenefit = (values.efficiencyGains || 0) + (values.errorReduction || 0) + (values.newRevenue || 0) + (values.otherBenefits || 0);

      if (totalInvestment === 0 && totalAnnualBenefit === 0) {
         toast({
          title: "Calculation Error",
          description: "Please provide some investment or benefit values.",
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
      });
      setIsComplete(true);
      setIsLoading(false);
      toast({
        title: "ROI Calculated!",
        description: "Your AR/MR project ROI has been estimated.",
      });
    } else {
      handleNext();
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Project Information
        return (
          <>
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
                    <Textarea placeholder="Briefly describe the project and its goals." {...field} />
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
      case 3: // Summary
        const values = getValues();
        const totalInvestment = (values.hardwareCost || 0) + (values.softwareCost || 0) + (values.trainingCost || 0) + (values.otherCosts || 0);
        const totalAnnualBenefit = (values.efficiencyGains || 0) + (values.errorReduction || 0) + (values.newRevenue || 0) + (values.otherBenefits || 0);
        
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project: {values.projectName || "N/A"}</h3>
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
              Based on the data provided. Click "Calculate ROI" to see the results.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (isComplete && roiResult) {
    const allValues = getValues();
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl">ROI Calculation Complete!</CardTitle>
            <CardDescription>
              Project: {allValues.projectName || "N/A"} | Use Case: {allValues.useCase || "N/A"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Overall ROI</p>
              <p className="text-4xl font-bold text-[hsl(var(--metric-positive))]">
                {isFinite(roiResult.roi) ? `${roiResult.roi}%` : "N/A (Check Inputs)"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annual Savings</p>
              <p className="text-3xl font-bold">${roiResult.annualSavings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-3xl font-bold">
                {isFinite(roiResult.paybackPeriod) ? `${roiResult.paybackPeriod} Years` : "N/A"}
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
          Follow the steps to enter your project data and calculate ROI.
        </p>
      </header>
      
      <Stepper steps={stepsConfig} currentStep={currentStep} onStepClick={(step) => {
          if (step < currentStep) { // Allow navigating to already visited & valid steps
             setCurrentStep(step);
             methods.setValue("step" as any, step);
          } else if (step > currentStep) {
            // To navigate forward, ensure current and intermediate steps are valid
            const validateAndProceed = async () => {
              for (let i = currentStep; i < step; i++) {
                const isStepValid = await trigger(
                  i === 0 ? ["projectName", "useCase"] : 
                  i === 1 ? ["hardwareCost", "softwareCost", "trainingCost", "otherCosts"] :
                  i === 2 ? ["efficiencyGains", "errorReduction", "newRevenue", "otherBenefits"] : 
                  []
                );
                if (!isStepValid) {
                  setCurrentStep(i); // Stay on the invalid step
                  methods.setValue("step" as any, i);
                  return;
                }
              }
              setCurrentStep(step);
              methods.setValue("step" as any, step);
            }
            validateAndProceed();
          }
      }} className="mb-12" />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>{stepsConfig[currentStep].title}</CardTitle>
              <CardDescription>{stepsConfig[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[200px]">
              {renderStepContent()}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isLoading}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="submit" disabled={isLoading || (currentStep < stepsConfig.length -1 && !isValid )}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentStep === stepsConfig.length - 1 ? (isLoading ? "Calculating..." : "Calculate ROI") : "Next"}
                {currentStep < stepsConfig.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}


    