import express from "express";
import cors from "cors";
import { CorsOptions } from "cors";

import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/error.middleware";
import routes from "./routes";

const app = express();


app.disable("x-powered-by");


app.use((_, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});


const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://your-frontend-domain.com"]
      : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));


app.use(express.json({ limit: "10kb" }));


app.use(requestLogger);


app.get("/favicon.ico", (_req, res) => res.status(204).end());


app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, data: { status: "OK" } });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});
app.use(errorHandler);

export default app;