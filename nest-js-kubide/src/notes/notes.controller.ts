import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Param,
  Patch,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createNote(
    @Res() res,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const createdNote = await this.noteService.createNote(createNoteDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Note Successfully created',
      createdNote,
    });
  }

  @Get()
  async getNotes(@Res() res): Promise<Note[]> {
    const allNotes = await this.noteService.getNotes();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Notes Successfully Obtained', allNotes });
  }

  @Get('/favorites')
  async getAllFavoritesNotes(@Res() res): Promise<Note[]> {
    const allFavoriteNotes = await this.noteService.getFavoritesNotes();
    return res.status(HttpStatus.OK).json({
      message: 'All Favorite Notes Obtained Successfully.',
      allFavoriteNotes,
    });
  }

  @Get('/:id')
  async getNoteById(@Res() res, @Param('id') id: string): Promise<Note> {
    const foundNote = await this.noteService.getNotetById(id);
    if (!foundNote)
      throw new NotFoundException(`ID: ${id} does not correspond to any note`);
    return res.status(HttpStatus.FOUND).json({
      message: 'Note Successfully Found',
      foundNote,
    });
  }

  @Patch('/:id/favorite')
  async updateFavoriteNote(
    @Res() res,
    @Param('id') id: string,
    @Body('favorite') favorite: boolean,
  ): Promise<Note[]> {
    const favoriteNote = await this.noteService.updateNoteFavorite(
      id,
      favorite,
    );
    if (!favoriteNote)
      throw new NotFoundException(`ID: ${id} does not correspond to any note`);
    return res
      .status(HttpStatus.ACCEPTED)
      .json({ message: 'Note Marked As Favorite', favoriteNote });
  }
}
