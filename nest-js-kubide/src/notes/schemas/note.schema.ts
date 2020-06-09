import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    favorite: { type: Boolean, enum: [true, false], default: false },
  },
  {
    timestamps: true,
  },
);
