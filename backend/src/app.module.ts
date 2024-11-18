import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import { DatabaseModule } from './database/database.module';
import { FolderController } from './folder/folder.controller';
import { FolderService } from './folder/folder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PhotoModule,
    DatabaseModule,
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class AppModule {}
