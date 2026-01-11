import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
  });
});
