import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    favorite: { type: Boolean, enum: [true, false], default: false },
  },
  {
    timestamps: true,
  },
);
