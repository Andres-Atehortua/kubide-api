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
import { CreateNoteDto } from './dto/create-note.dto';
import { FavoriteValidationPipe } from './pipes/note-favorite-validation.pipe';
import { Response } from 'express';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createNote(
    @Res() res: Response,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Response> {
    const createdNote = await this.noteService.createNote(createNoteDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Note Successfully created',
      createdNote,
    });
  }

  @Get()
  async getNotes(@Res() res: Response): Promise<Response> {
    const allNotes = await this.noteService.getNotes();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Notes Successfully Obtained', allNotes });
  }

  @Get('/favorites')
  async getAllFavoritesNotes(@Res() res: Response): Promise<Response> {
    const allFavoriteNotes = await this.noteService.getFavoritesNotes();
    return res.status(HttpStatus.OK).json({
      message: 'All Favorite Notes Obtained Successfully.',
      allFavoriteNotes,
    });
  }

  @Get('/:id')
  async getNoteById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response> {
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
    @Res() res: Response,
    @Param('id') id: string,
    @Body('favorite', FavoriteValidationPipe) favorite: string,
  ): Promise<Response> {
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
