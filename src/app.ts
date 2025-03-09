import express from "express";
import dotenv from 'dotenv';
import githubRoutes from "./platforms/github/routes";
import { PORT } from "./config/constants";

// Load environment variables from .env file
dotenv.config();

export const GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com';
export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN || '';

export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
export const ALIYUN_BAILIAN_API_KEY = process.env.ALIYUN_BAILIAN_API_KEY || '';

const app = express();
app.use(express.json());

// Platform-specific routes
app.use(githubRoutes);

// Ready for future GitLab integration
// app.use(gitlabRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
