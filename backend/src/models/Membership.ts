import mongoose, { Document, Model } from "mongoose";

export interface IMembership extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  role: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const membershipSchema = new mongoose.Schema<IMembership>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

membershipSchema.index({ user: 1, team: 1 }, { unique: true });

export const Membership: Model<IMembership> =
  mongoose.model<IMembership>("Membership", membershipSchema);