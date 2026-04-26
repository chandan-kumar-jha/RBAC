import express from "express";
import cors from "cors";
import path from "path";
import { CorsOptions } from "cors";

import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/error.middleware";
import routes from "./routes";

const app = express();

app.disable("x-powered-by");

// Security headers
app.use((_, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// CORS
const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://your-frontend-domain.com"]
      : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: "10kb" }));

// Logger
app.use(requestLogger);

// Health
app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, data: { status: "OK" } });
});

// API routes
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../public")));
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


// Error handler
app.use(errorHandler);

export default app;   