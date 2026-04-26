import mongoose, { Document, Model } from "mongoose";

export interface IPermission extends Document {
  name: string;
}

const permissionSchema = new mongoose.Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Permission: Model<IPermission> =
  mongoose.model<IPermission>("Permission", permissionSchema);