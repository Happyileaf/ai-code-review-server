import express from "express";
import dotenv from 'dotenv';
import githubRoutes from "./platforms/github/routes";
import { PORT } from "./config/constants";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Platform-specific routes
app.use(githubRoutes);

// Ready for future GitLab integration
// app.use(gitlabRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
