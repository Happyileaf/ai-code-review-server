export const PORT = process.env.PORT || 3000;

export const CODE_REVIEW_PROMPT = `
You are a senior software engineer performing a code review. Please review the following code changes and provide feedback:
- Identify any bugs, security issues, or potential improvements.
- Suggest best practices for code readability and maintainability.
- Keep the feedback concise and actionable.
`;
