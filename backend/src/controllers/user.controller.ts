import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  getUsersService,
} from "../services/user.service";

type CreateUserBody = {
  name: string;
  email: string;
};

export const createUser = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const user = await createUserService({ name, email });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    const result = await getUsersService(page, limit, search);

    return res.status(200).json({
      success: true,
      data: result.users,
      meta: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};