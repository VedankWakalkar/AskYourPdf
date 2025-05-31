import { config } from "dotenv";
import path from "path";

// Load correct env file based on NODE_ENV (default: development)
config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`)
});

// Exporting variables
export const {
  PORT,
  BULLMQ_PORT,
  QDRANT_URL,
  HOST,
  NODE_ENV,
  GOOGLE_API_KEY
} = process.env;
