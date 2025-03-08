import axios from "axios";
import { GITHUB_API_URL, GITHUB_ACCESS_TOKEN } from "../../../config/constants";
import { GitHubComment } from "../types";

export async function postComment(
  repoFullName: string,
  pullRequestId: number,
  comment: string,
  filePath: string
): Promise<void> {
  const url = `${GITHUB_API_URL}/repos/${repoFullName}/pulls/${pullRequestId}/comments`;
  const commentData: GitHubComment = {
    body: `**Code Review for ${filePath}:**\n\n${comment}`,
    path: filePath,
    position: 1, // This could be improved to point to specific lines
  };

  await axios.post(url, commentData, {
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
}
