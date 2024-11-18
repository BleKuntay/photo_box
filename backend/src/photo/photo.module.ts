import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { photoProviders } from './photo.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [PhotoService, ...photoProviders],
  exports: [PhotoService],
})
export class PhotoModule {}
