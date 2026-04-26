import mongoose from "mongoose";
import { ENV } from "./env";
import { logger } from "../utils/logger";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI, {
      autoIndex: ENV.NODE_ENV !== "production",
    });

    logger.info("✅ MongoDB connected");
  } catch (error) {
    logger.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};