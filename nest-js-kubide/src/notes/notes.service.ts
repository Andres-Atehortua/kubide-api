import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async getNotes(): Promise<Note[]> {
    const allNotes = await this.noteModel.find();

    return allNotes;
  }

  async getFavoritesNotes(): Promise<Note[]> {
    const favoriteNotes = await this.noteModel.find({ favorite: true });
    return favoriteNotes;
  }

  async getNotetById(noteID: string): Promise<Note> {
    const found = await this.noteModel.findById(noteID);

    return found;
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = await this.noteModel.create(createNoteDto);
    return createdNote;
  }

  async updateNoteFavorite(id: string, favorite: boolean): Promise<Note> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(
      id,
      {
        favorite,
      },
      { new: true },
    );
    return updatedNote;
  }
}
