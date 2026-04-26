import mongoose, { Document, Model } from "mongoose";

export interface ITeam extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new mongoose.Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

teamSchema.index({ name: 1 }, { unique: true });

export const Team: Model<ITeam> = mongoose.model<ITeam>("Team", teamSchema);