import { Router } from "express";
import { handlePullRequestWebhook } from "../controllers";

const router = Router();

router.post("/webhook/github", handlePullRequestWebhook);

export default router;
