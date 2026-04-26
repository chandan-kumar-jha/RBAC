import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controller";
import { authenticate } from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/rbac.middleware";

const router = Router();

router.post("/", authenticate, createRole);

// 🔓 optional: public if you need it in UI
router.get("/", getRoles);

export default router;