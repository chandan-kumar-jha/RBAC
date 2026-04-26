import { Team, ITeam } from "../models/Team";

export const createTeamService = async (name: string): Promise<ITeam> => {
  try {
    return await Team.create({ name });
  } catch (err: any) {
    if (err?.code === 11000) {
      const error = new Error("Team already exists");
      (error as any).statusCode = 409;
      throw error;
    }
    const error = new Error("Failed to create team");
    (error as any).statusCode = 500;
    throw error;
  }
};

export const getTeamsService = async (): Promise<ITeam[]> => {
  return Team.find().sort({ createdAt: -1 }).lean();
};