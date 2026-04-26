import { Router } from "express";
import { createTeam, getTeams } from "../controllers/team.controller";
import { authenticate } from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/rbac.middleware";

const router = Router();

router.post("/", authenticate, createTeam);

// 🔓 make public
router.get("/", getTeams);

export default router;