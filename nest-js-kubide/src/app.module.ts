import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    NotesModule,
    MongooseModule.forRoot(process.env.DB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
