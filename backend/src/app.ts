import "reflect-metadata";
import express from "express";
import { errorHandler } from "./api/middleware/handle-error";
import { authRouter } from "./api/router/auth-router";
import { profileRouter } from "./api/router/profile-router";
import { documentRouter } from "./api/router/document-router";
import { collaborationRouter } from "./api/router/collaboration-router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

// Auth routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/documents", documentRouter);
app.use("/api/collaborations", collaborationRouter);

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;
