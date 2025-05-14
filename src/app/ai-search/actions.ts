"use server";

import { roiDocumentSearch, type RoiDocumentSearchInput, type RoiDocumentSearchOutput } from "@/ai/flows/roi-document-search";
import { z } from "zod";

const SearchInputSchema = z.object({
  query: z.string().min(3, "Search query must be at least 3 characters long."),
});

interface FormState {
  message: string;
  data?: RoiDocumentSearchOutput;
  error?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function performAiSearch(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const query = formData.get("query") as string;

  const validatedFields = SearchInputSchema.safeParse({ query });

  if (!validatedFields.success) {
    return {
      message: "Invalid input.",
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: RoiDocumentSearchInput = { query: validatedFields.data.query };
    const result = await roiDocumentSearch(input);
    
    if (!result || !result.results) {
        return { message: "AI Search failed to return results.", error: true };
    }

    return { message: "Search successful!", data: result };
  } catch (error) {
    console.error("AI Search Error:", error);
    return { message: "An unexpected error occurred during the AI search.", error: true };
  }
}
