import { Response, NextFunction } from "express";
import { getUserPermissionsService } from "../services/permission.service";
import { AuthRequest } from "./auth.middleware";
import { Membership } from "../models/Membership"; // ✅ FIXED IMPORT

export const checkPermission = (requiredPermission: string) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.userId;
      const teamId = req.headers["x-team-id"] as string;

      // 🔥 BOOTSTRAP BYPASS (CRITICAL)
      const membershipCount = await Membership.countDocuments();

      if (membershipCount === 0) {
        console.log("⚡ Bootstrap mode: skipping RBAC");
        next();
        return;
      }

      // 🔒 Validate context
      if (!userId || !teamId) {
        res.status(401).json({
          success: false,
          message: "Missing authentication or team context",
        });
        return;
      }

      // 🔒 Get user permissions
      const permissions = await getUserPermissionsService(userId, teamId);

      // 🔒 Check permission
      if (!permissions.includes(requiredPermission)) {
        res.status(403).json({
          success: false,
          message: "Forbidden: insufficient permissions",
        });
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};