import { Request, Response } from "express";
import { GitHubWebhookEvent } from "../types";
import { fetchDiffContent, parseDiffContent, postComment } from "../services";
import { performCodeReview } from "../../../core/codeReview";

export async function handlePullRequestWebhook(req: Request, res: Response): Promise<void> {
  const event: GitHubWebhookEvent = req.body;

  if (event.action === "opened" && event.pull_request) {
    const pullRequestId = event.pull_request.number;
    const repoFullName = event.repository?.full_name;
    const diffUrl = event.pull_request.diff_url;

    if (!repoFullName) {
      res.status(400).send("Repository full name is missing.");
      return;
    }

    try {
      // 获取完整的diff内容
      const diffContent = await fetchDiffContent(diffUrl);

      // 解析diff内容，拆分为独立的代码块
      const diffs = parseDiffContent(diffContent);

      // 对每个diff进行Code Review
      for (const diff of diffs) {
        const reviewResult = await performCodeReview(diff);

        if (reviewResult.comments) {
          await postComment(
            repoFullName,
            pullRequestId,
            reviewResult.comments,
            reviewResult.filePath
          );
        }
      }

      res.status(200).send("Code review completed and comments posted.");
    } catch (error) {
      console.error("Error processing GitHub pull request:", error);
      res.status(500).send("Error processing pull request.");
    }
  } else {
    res.status(200).send("Event not related to pull request opening.");
  }
}
