import OpenAI from "openai";
import { CODE_REVIEW_PROMPT } from "../config/constants";
import { ALIYUN_BAILIAN_API_KEY } from "../app";

// const openai = new OpenAI({
//   baseURL: "https://api.deepseek.com",
//   apiKey: DEEPSEEK_API_KEY,
// });

export interface CodeDiff {
  filePath: string;
  content: string;
}

export interface ReviewResult {
  filePath: string;
  comments: string;
}

export async function performCodeReview(diff: CodeDiff): Promise<ReviewResult> {
  const openai = new OpenAI({
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    apiKey: ALIYUN_BAILIAN_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    // model: "deepseek-chat",
    model: "deepseek-r1",
    messages: [
      { role: "system", content: CODE_REVIEW_PROMPT },
      {
        role: "user",
        content: `Review the following code changes:\n${diff.content}`,
      },
    ],
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
