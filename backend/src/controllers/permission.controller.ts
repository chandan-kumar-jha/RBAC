import { Request, Response, NextFunction } from "express";
import {
  createPermissionService,
  getPermissionsService,
  getUserPermissionsService,
} from "../services/permission.service";

type CreatePermissionBody = {
  name: string;
};

export const createPermission = async (
  req: Request<{}, {}, CreatePermissionBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Permission name is required",
      });
    }

    const permission = await createPermissionService(name);

    return res.status(201).json({
      success: true,
      data: permission,
    });
  } catch (err) {
    next(err);
  }
};

export const getPermissions = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions = await getPermissionsService();

    return res.status(200).json({
      success: true,
      data: permissions,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserPermissions = async (
  req: Request<{ userId: string; teamId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, teamId } = req.params;

    if (!userId || !teamId) {
      return res.status(400).json({
        success: false,
        message: "userId and teamId are required",
      });
    }

    const permissions = await getUserPermissionsService(userId, teamId);

    return res.status(200).json({
      success: true,
      data: permissions,
    });
  } catch (err) {
    next(err);
  }
};