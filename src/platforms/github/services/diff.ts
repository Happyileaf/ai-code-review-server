import axios from "axios";
import { CodeDiff } from "../../../core/codeReview";

export async function fetchDiffContent(diffUrl: string): Promise<string> {
  const diffResponse = await axios.get(diffUrl);
  return diffResponse.data;
}

export function parseDiffContent(diffContent: string): CodeDiff[] {
  const diffBlocks = diffContent.split("diff --git");
  const diffs: CodeDiff[] = [];

  for (const block of diffBlocks) {
    if (!block.trim()) continue;

    const filePathMatch = block.match(/b\/(.+?)\n/);
    if (!filePathMatch) continue;

    const filePath = filePathMatch[1];
    const content = block.trim();

    diffs.push({ filePath, content });
  }

  return diffs;
}
