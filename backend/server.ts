import { ENV } from "./src/config/env";
import { connectDB } from "./src/config/db";
import app from "./src/app";
import { logger } from "./src/utils/logger";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(ENV.PORT, () => {
      logger.info(`🚀 Server running on port ${ENV.PORT}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received. Shutting down...");
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT received. Shutting down...");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();