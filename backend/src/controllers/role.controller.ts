import { Request, Response, NextFunction } from "express";
import {
  createRoleService,
  getRolesService,
} from "../services/role.service";

type CreateRoleBody = {
  name: string;
  permissions: string[];
};

export const createRole = async (
  req: Request<{}, {}, CreateRoleBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, permissions } = req.body;

    if (!name || !Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and permissions are required",
      });
    }

    const role = await createRoleService(name, permissions);

    return res.status(201).json({
      success: true,
      data: role,
    });
  } catch (err) {
    next(err);
  }
};

export const getRoles = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await getRolesService();

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (err) {
    next(err);
  }
};