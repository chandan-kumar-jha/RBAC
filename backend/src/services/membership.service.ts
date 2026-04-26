import mongoose from "mongoose";
import { Membership, IMembership } from "../models/Membership";
import { isValidObjectId } from "../utils/validateObjectId";
import { User } from "../models/User";
import { Team } from "../models/Team";
import { Role } from "../models/Role";

const toObjectId = (id: string) => new mongoose.Types.ObjectId(id);

const assertValidIds = (ids: string[]) => {
  if (ids.some((id) => !isValidObjectId(id))) {
    const err = new Error("Invalid ObjectId provided");
    (err as any).statusCode = 400;
    throw err;
  }
};

/**
 * Assign or update role for (user, team) atomically.
 * Uses upsert to avoid race conditions and respects unique index (user, team).
 */
export const assignRoleService = async (
  userId: string,
  teamId: string,
  roleId: string
): Promise<IMembership> => {
  assertValidIds([userId, teamId, roleId]);

  const [userObjectId, teamObjectId, roleObjectId] = [
    toObjectId(userId),
    toObjectId(teamId),
    toObjectId(roleId),
  ];

  // 🔒 Referential integrity checks
  const [userExists, teamExists, roleExists] = await Promise.all([
    User.exists({ _id: userObjectId }),
    Team.exists({ _id: teamObjectId }),
    Role.exists({ _id: roleObjectId }),
  ]);

  if (!userExists || !teamExists || !roleExists) {
    const err = new Error("User, Team, or Role not found");
    (err as any).statusCode = 404;
    throw err;
  }

  try {
    const membership = await Membership.findOneAndUpdate(
      { user: userObjectId, team: teamObjectId },
      { $set: { role: roleObjectId } },
      { new: true, upsert: true, runValidators: true }
    );
    if (!membership) {
      const created = await Membership.create({
        user: userObjectId,
        team: teamObjectId,
        role: roleObjectId,
      });
      return created;
    }

    return membership;
  } catch (error: any) {
    if (error?.code === 11000) {
      const existing = await Membership.findOne({
        user: userObjectId,
        team: teamObjectId,
      });
      if (existing) return existing;
    }
    const err = new Error("Failed to assign role");
    (err as any).statusCode = 500;
    throw err;
  }
};

export const removeUserFromTeamService = async (
  userId: string,
  teamId: string
): Promise<IMembership> => {
  assertValidIds([userId, teamId]);

  const result = await Membership.findOneAndDelete({
    user: toObjectId(userId),
    team: toObjectId(teamId),
  });

  if (!result) {
    const err = new Error("User is not part of this team");
    (err as any).statusCode = 404;
    throw err;
  }

  return result;
};