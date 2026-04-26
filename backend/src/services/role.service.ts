import mongoose from "mongoose";
import { Role, IRole } from "../models/Role";
import { Permission } from "../models/Permission";
import { isValidObjectId } from "../utils/validateObjectId";

const toObjectId = (id: string) => new mongoose.Types.ObjectId(id);

export const createRoleService = async (
  name: string,
  permissions: string[]
): Promise<IRole> => {
  if (!Array.isArray(permissions) || permissions.length === 0) {
    const err = new Error("At least one permission is required");
    (err as any).statusCode = 400;
    throw err;
  }

  if (permissions.some((id) => !isValidObjectId(id))) {
    const err = new Error("Invalid permission IDs");
    (err as any).statusCode = 400;
    throw err;
  }

  const permissionObjectIds = permissions.map(toObjectId);

  // 🔒 Ensure all permission IDs exist
  const count = await Permission.countDocuments({
    _id: { $in: permissionObjectIds },
  });

  if (count !== permissionObjectIds.length) {
    const err = new Error("One or more permissions not found");
    (err as any).statusCode = 404;
    throw err;
  }

  try {
    return await Role.create({ name, permissions: permissionObjectIds });
  } catch (err: any) {
    if (err?.code === 11000) {
      const error = new Error("Role already exists");
      (error as any).statusCode = 409;
      throw error;
    }
    const error = new Error("Failed to create role");
    (error as any).statusCode = 500;
    throw error;
  }
};

export const getRolesService = async (): Promise<IRole[]> => {
  return Role.find()
    .populate({ path: "permissions", select: "name" })
    .sort({ createdAt: -1 })
    .lean();
};