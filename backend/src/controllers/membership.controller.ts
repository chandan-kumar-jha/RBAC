import { Request, Response, NextFunction } from "express";
import {
  assignRoleService,
  removeUserFromTeamService,
} from "../services/membership.service";

type AssignRoleBody = {
  userId: string;
  teamId: string;
  roleId: string;
};

export const assignRole = async (
  req: Request<{}, {}, AssignRoleBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, teamId, roleId } = req.body;

    if (!userId || !teamId || !roleId) {
      return res.status(400).json({
        success: false,
        message: "userId, teamId, and roleId are required",
      });
    }

    const membership = await assignRoleService(userId, teamId, roleId);

    return res.status(200).json({
      success: true,
      data: membership,
    });
  } catch (err) {
    next(err);
  }
};

type RemoveBody = {
  userId: string;
  teamId: string;
};

export const removeUserFromTeam = async (
  req: Request<{}, {}, RemoveBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, teamId } = req.body;

    if (!userId || !teamId) {
      return res.status(400).json({
        success: false,
        message: "userId and teamId are required",
      });
    }

    const result = await removeUserFromTeamService(userId, teamId);

    return res.status(200).json({
      success: true,
      message: "User removed from team",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};