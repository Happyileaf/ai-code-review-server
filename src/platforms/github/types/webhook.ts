export interface GitHubWebhookEvent {
  action: string;
  pull_request?: {
    number: number;
    diff_url: string;
  };
  repository?: {
    full_name: string;
  };
}
