import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    // 🔒 Validate header existence
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: token missing",
      });
      return;
    }

    // 🔒 Validate Bearer format
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        success: false,
        message: "Unauthorized: invalid auth format",
      });
      return;
    }

    // ✅ Extract token safely
    let token = parts[1];

    // 🔥 FIX: remove accidental quotes + trim spaces
    token = token.replace(/^"|"$/g, "").trim();

    // 🔒 Final sanity check
    if (!token || token.split(".").length !== 3) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: malformed token",
      });
      return;
    }

    // 🧪 Debug (can remove later)
    console.log("RAW HEADER:", authHeader);
    console.log("CLEAN TOKEN:", token);

    // ✅ Verify token
    const decoded = verifyToken(token) as { userId: string };

    if (!decoded?.userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: invalid payload",
      });
      return;
    }

    req.userId = decoded.userId;

    next();
  } catch (err: any) {
    console.error("JWT ERROR:", err.message);

    res.status(401).json({
      success: false,
      message: "Unauthorized: invalid token",
    });
  }
};