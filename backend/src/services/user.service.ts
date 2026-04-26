import { User, IUser } from "../models/User";

export const createUserService = async (data: {
  name: string;
  email: string;
}): Promise<IUser> => {
  try {
    return await User.create(data);
  } catch (err: any) {
    if (err?.code === 11000) {
      const error = new Error("Email already exists");
      (error as any).statusCode = 409;
      throw error;
    }
    const error = new Error("Failed to create user");
    (error as any).statusCode = 500;
    throw error;
  }
};
export const getUsersService = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const skip = (page - 1) * limit;

  const query = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit),
    User.countDocuments(query),
  ]);

  return {
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};