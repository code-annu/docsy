import "reflect-metadata";
import express from "express";
import { errorHandler } from "./api/middleware/handle-error";
import { authRouter } from "./api/router/auth-router";
import { profileRouter } from "./api/router/profile-router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});

// Auth routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
// app.use("/api/documents", documentRouter);

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;
