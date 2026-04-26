import mongoose, { Document, Model } from "mongoose";

export interface IRole extends Document {
  name: string;
  permissions: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new mongoose.Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

roleSchema.index({ name: 1 }, { unique: true });

export const Role: Model<IRole> = mongoose.model<IRole>("Role", roleSchema);