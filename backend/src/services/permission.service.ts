import mongoose from "mongoose";
import { Permission, IPermission } from "../models/Permission";
import { Membership } from "../models/Membership";
import { isValidObjectId } from "../utils/validateObjectId";

const toObjectId = (id: string) => new mongoose.Types.ObjectId(id);

const isDuplicateKey = (err: any) => err?.code === 11000;

// ✅ Create permission
export const createPermissionService = async (
  name: string
): Promise<IPermission> => {
  try {
    return await Permission.create({ name });
  } catch (err: any) {
    if (isDuplicateKey(err)) {
      const error = new Error("Permission already exists");
      (error as any).statusCode = 409;
      throw error;
    }
    const error = new Error("Failed to create permission");
    (error as any).statusCode = 500;
    throw error;
  }
};

// ✅ Get all permissions
export const getPermissionsService = async (): Promise<IPermission[]> => {
  return Permission.find().sort({ name: 1 }).lean();
};

// 🔥 CORE RBAC FUNCTION (THIS WAS MISSING)
export const getUserPermissionsService = async (
  userId: string,
  teamId: string
): Promise<string[]> => {
  if (!isValidObjectId(userId) || !isValidObjectId(teamId)) {
    const err = new Error("Invalid ObjectId");
    (err as any).statusCode = 400;
    throw err;
  }

  const membership = await Membership.findOne({
    user: toObjectId(userId),
    team: toObjectId(teamId),
  }).populate({
    path: "role",
    populate: {
      path: "permissions",
      select: "name -_id",
    },
  });

  // No role assigned → no permissions (as per PDF)
  if (!membership) {
    return [];
  }

  const role: any = membership.role;

  if (!role || !Array.isArray(role.permissions)) {
    return [];
  }

  // Return only permission names
  return role.permissions.map((p: { name: string }) => p.name);
};