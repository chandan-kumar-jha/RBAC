import mongoose from "mongoose";
import dotenv from "dotenv";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

const permissions = [
  "CREATE_TEAM",
  "CREATE_ROLE",
  "ASSIGN_ROLE",
  "REMOVE_USER",
  "VIEW_USERS",
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);

  console.log("Connected");

  const createdPermissions = await Promise.all(
    permissions.map((name) =>
      Permission.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, new: true }
      )
    )
  );

  const adminRole = await Role.findOneAndUpdate(
    { name: "ADMIN" },
    { name: "ADMIN", permissions: createdPermissions.map(p => p._id) },
    { upsert: true, new: true }
  );

  const viewerRole = await Role.findOneAndUpdate(
    { name: "VIEWER" },
    {
      name: "VIEWER",
      permissions: createdPermissions
        .filter(p => p.name === "VIEW_USERS")
        .map(p => p._id),
    },
    { upsert: true, new: true }
  );

  console.log("Seed completed");
  process.exit(0);
};

seed();