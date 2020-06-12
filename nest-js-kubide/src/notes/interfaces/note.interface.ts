import { Document } from 'mongoose';

export interface Note extends Document {
  readonly title: string;
  readonly description: string;
  readonly favorite: string;
}
