import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", createUser);

// 🔓 make public
router.get("/", getUsers);

export default router;