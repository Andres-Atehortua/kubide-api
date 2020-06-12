import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    favorite: { type: String, enum: ['true', 'false'], default: 'false' },
  },
  {
    timestamps: true,
  },
);
