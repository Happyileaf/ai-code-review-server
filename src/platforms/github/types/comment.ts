export interface GitHubComment {
  body: string;
  path: string;
  commit_id: string;
  line?: number;
  side?: 'LEFT' | 'RIGHT';
  start_line?: number;
  start_side?: 'LEFT' | 'RIGHT';
}
