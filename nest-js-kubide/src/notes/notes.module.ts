import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/note.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
