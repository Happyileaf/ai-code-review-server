import OpenAI from "openai";
import { CODE_REVIEW_PROMPT, DEEPSEEK_API_KEY } from "../config/constants";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: DEEPSEEK_API_KEY,
});

export interface CodeDiff {
  filePath: string;
  content: string;
}

export interface ReviewResult {
  filePath: string;
  comments: string;
}

export async function performCodeReview(diff: CodeDiff): Promise<ReviewResult> {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: CODE_REVIEW_PROMPT },
      {
        role: "user",
        content: `Review the following code changes:\n${diff.content}`,
      },
    ],
    model: "deepseek-chat",
  });

  const reviewContent = completion.choices[0].message.content as string;
  const comments = analyzeReviewResults(reviewContent);
  
  return {
    filePath: diff.filePath,
    comments: comments || "",
  };
}

function analyzeReviewResults(reviewResults: string): string | null {
  if (reviewResults.toLowerCase().includes("no issues found")) {
    return null;
  }
  return reviewResults;
}
