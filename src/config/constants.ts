export const GITHUB_API_URL = "https://api.github.com";
export const GITHUB_ACCESS_TOKEN = "<Your GitHub Access Token>";
export const DEEPSEEK_API_KEY = "Your DeepSeek API Key";
export const PORT = process.env.PORT || 3000;

export const CODE_REVIEW_PROMPT = `
You are a senior software engineer performing a code review. Please review the following code changes and provide feedback:
- Identify any bugs, security issues, or potential improvements.
- Suggest best practices for code readability and maintainability.
- Keep the feedback concise and actionable.
`;
