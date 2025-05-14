// src/ai/flows/roi-document-search.ts
'use server';
/**
 * @fileOverview An AI search agent for finding relevant documentation related to AR/MR ROI.
 *
 * - roiDocumentSearch - A function that handles the document search process.
 * - RoiDocumentSearchInput - The input type for the roiDocumentSearch function.
 * - RoiDocumentSearchOutput - The return type for the roiDocumentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoiDocumentSearchInputSchema = z.object({
  query: z.string().describe('The search query for AR/MR ROI documentation.'),
});
export type RoiDocumentSearchInput = z.infer<typeof RoiDocumentSearchInputSchema>;

const RoiDocumentSearchOutputSchema = z.object({
  results: z.array(
    z.object({
      title: z.string().describe('The title of the document.'),
      link: z.string().describe('The URL of the document.'),
      summary: z.string().describe('A summary of the document.'),
    })
  ).describe('A list of search results.'),
  reasoning: z.string().describe('The chain of thought reasoning steps taken by the AI search agent.'),
});
export type RoiDocumentSearchOutput = z.infer<typeof RoiDocumentSearchOutputSchema>;

export async function roiDocumentSearch(input: RoiDocumentSearchInput): Promise<RoiDocumentSearchOutput> {
  return roiDocumentSearchFlow(input);
}

const searchDocuments = ai.defineTool(
  {
    name: 'searchDocuments',
    description: 'Searches for documents related to AR/MR ROI on the web.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.array(
      z.object({
        title: z.string().describe('The title of the document.'),
        link: z.string().describe('The URL of the document.'),
        snippet: z.string().describe('A snippet of the document content.'),
      })
    ),
  },
  async input => {
    // TODO: Implement the actual search functionality here.
    // This is a placeholder that returns dummy data.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network latency
    return [
      {
        title: 'Example AR/MR ROI Document 1',
        link: 'https://example.com/ar-mr-roi-1',
        snippet: 'This document discusses the benefits of AR/MR in manufacturing.',
      },
      {
        title: 'AR/MR ROI Case Study 2',
        link: 'https://example.com/ar-mr-roi-2',
        snippet: 'A case study on how AR/MR improved efficiency in logistics.',
      },
    ];
  }
);

const prompt = ai.definePrompt({
  name: 'roiDocumentSearchPrompt',
  input: {schema: RoiDocumentSearchInputSchema},
  output: {schema: RoiDocumentSearchOutputSchema},
  tools: [searchDocuments],
  prompt: `You are an AI search agent tasked with finding relevant documentation related to AR/MR ROI (Return on Investment).

  The user will provide a search query, and your goal is to find the most relevant documents and provide a summary of each.
  You must use the searchDocuments tool to find the documents.
  Return a list of search results, including the title, link, and summary of each document.
  Also, provide a chain of thought reasoning explaining the steps you took to find the documents.

  User Query: {{{query}}}
  `,
});

const roiDocumentSearchFlow = ai.defineFlow(
  {
    name: 'roiDocumentSearchFlow',
    inputSchema: RoiDocumentSearchInputSchema,
    outputSchema: RoiDocumentSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
