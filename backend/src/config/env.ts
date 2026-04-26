import dotenv from "dotenv";

dotenv.config();

type EnvConfig = {
  PORT: number;
  MONGO_URI: string;
  NODE_ENV: "development" | "production" | "test";
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
};

const getEnv = (): EnvConfig => {
  const { PORT, MONGO_URI, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing");
  }

  if (!JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is missing");
  }

  return {
    PORT: PORT ? parseInt(PORT, 10) : 5000,
    MONGO_URI,
    NODE_ENV: (NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
    JWT_SECRET,
    JWT_EXPIRES_IN: JWT_EXPIRES_IN || "1d",
  };
};

export const ENV = getEnv();