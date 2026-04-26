import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

// Public
router.post("/login", login);

export default router;