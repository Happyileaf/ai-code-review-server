import axios from "axios";
import { GitHubComment } from "../types";
import { GITHUB_ACCESS_TOKEN, GITHUB_API_URL } from "../../../app";

export async function postComment(
  repoFullName: string,
  pullRequestId: number,
  comment: string,
  filePath: string,
  commitId: string
): Promise<void> {
  const url = `${GITHUB_API_URL}/repos/${repoFullName}/pulls/${pullRequestId}/comments`;
  const commentData: GitHubComment = {
    body: `**Code Review for ${filePath}:**\n\n${comment}`,
    path: filePath,
    commit_id: commitId,
    line: 1,
    side: 'RIGHT'
  };

  try {
    console.log("Posting comment to GitHub:", {
      url,
      repoFullName,
      pullRequestId,
      filePath,
      commitId,
      headers: {
        Authorization: 'Bearer [TOKEN_LENGTH:' + (GITHUB_ACCESS_TOKEN?.length || 0) + ']'
      }
    });
    
    await axios.post(url, commentData, {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('GitHub API Error Details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
    }
    throw error;
  }
}
