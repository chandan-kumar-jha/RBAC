import { Router } from "express";

import userRoutes from "./user.routes";
import teamRoutes from "./team.routes";
import roleRoutes from "./role.routes";
import permissionRoutes from "./permission.routes";
import membershipRoutes from "./membership.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/membership", membershipRoutes);

export default router;