import { Request, Response, NextFunction } from "express";
import {
  createTeamService,
  getTeamsService,
} from "../services/team.service";

type CreateTeamBody = {
  name: string;
};

export const createTeam = async (
  req: Request<{}, {}, CreateTeamBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Team name is required",
      });
    }

    const team = await createTeamService(name);

    return res.status(201).json({
      success: true,
      data: team,
    });
  } catch (err) {
    next(err);
  }
};

export const getTeams = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teams = await getTeamsService();

    return res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (err) {
    next(err);
  }
};