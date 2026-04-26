import { Router } from "express";
import {
  createPermission,
  getPermissions,
  getUserPermissions,
} from "../controllers/permission.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.post("/", authenticate, createPermission);

// 🔓 make public
router.get("/", getPermissions);

// 🔓 core read API public
router.get("/user/:userId/team/:teamId", getUserPermissions);


export default router;