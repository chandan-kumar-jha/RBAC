import { Router } from "express";
import {
  assignRole,
  removeUserFromTeam,
} from "../controllers/membership.controller";
import { authenticate } from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/rbac.middleware";

const router = Router();
router.post("/assign-role", authenticate, assignRole);
router.delete("/remove", authenticate, checkPermission("DELETE_TASK"), removeUserFromTeam);

export default router;