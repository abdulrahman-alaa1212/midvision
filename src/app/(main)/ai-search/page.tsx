"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { performAiSearch } from "@/app/ai-search/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Search, ExternalLink, MessageSquareText, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
      Search
    </Button>
  );
}

export default function AiSearchPage() {
  const initialState = { message: "", error: false, fieldErrors: {} };
  const [state, formAction] = useActionState(performAiSearch, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && !state.data) {
      toast({
        title: state.error ? "Search Error" : "Search Status",
        description: state.message,
        variant: state.error ? "destructive" : "default",
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Document Search</h1>
        <p className="text-muted-foreground">
          Find relevant AR/MR ROI documentation using our AI-powered search agent.
        </p>
      </header>

      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Search Query</CardTitle>
            <CardDescription>Enter your search terms related to AR/MR ROI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="query" className="sr-only">Search Query</Label>
              <Input
                id="query"
                name="query"
                type="text"
                placeholder="e.g., ROI in manufacturing AR, AR training cost savings"
                className={state?.fieldErrors?.query ? "border-destructive" : ""}
              />
              {state?.fieldErrors?.query && (
                <p className="text-sm text-destructive mt-1">{state.fieldErrors.query[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state?.data && (
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          
          {state.data.reasoning && (
             <Card className="bg-secondary/50">
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="w-6 h-6 text-accent" />
                <CardTitle className="text-lg">AI Reasoning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{state.data.reasoning}</p>
              </CardContent>
            </Card>
          )}

          {state.data.results.length > 0 ? (
            <div className="space-y-4">
              {state.data.results.map((result, index) => (
                <Card key={index} className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl hover:text-accent transition-colors">
                      <Link href={result.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        {result.title}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      <Link href={result.link} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:underline">
                        {result.link}
                      </Link>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{result.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <MessageSquareText className="h-4 w-4" />
              <AlertTitle>No Results Found</AlertTitle>
              <AlertDescription>
                The AI agent could not find any documents matching your query. Try refining your search terms.
              </AlertDescription>
            </Alert>
          )}
        </section>
      )}
    </div>
  );
}
