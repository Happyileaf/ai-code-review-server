export interface GitHubWebhookEvent {
  action: string;
  pull_request?: {
    number: number;
    diff_url: string;
    head: {
      sha: string;
    };
  };
  repository?: {
    full_name: string;
  };
}
