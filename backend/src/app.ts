import "reflect-metadata";
import express, { Application } from "express";
import { config } from "dotenv";

// Load environment variables
config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Docsy API is running!",
  });
});

// Export app for use in server.ts
export default app;
