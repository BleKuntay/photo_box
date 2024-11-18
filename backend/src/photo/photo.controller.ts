import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { RenamePhotoDto } from './dto/rename-photo.dto';
import { MovePhotoDto } from './dto/move-photo.dto';

@Controller('api/photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Photo[]> {
    const photos = await this.photoService.findAll();

    if (photos.length === 0) {
      throw new NotFoundException('No photo found');
    }

    return photos;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Photo> {
    return await this.photoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postPhoto(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return await this.photoService.postPhoto(createPhotoDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async renamePhoto(
    @Param('id') id: string,
    @Body() updatePhotoDto: RenamePhotoDto,
  ): Promise<Photo> {
    return await this.photoService.renamePhoto(id, updatePhotoDto.newName);
  }

  @Patch(':id/move')
  @HttpCode(HttpStatus.OK)
  async movePhoto(
    @Param('id') id: string,
    @Body() movePhotoDto: MovePhotoDto,
  ): Promise<Photo> {
    return await this.photoService.movePhoto(id, movePhotoDto.folderId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deletePhoto(
    @Param('id') id: string,
  ): Promise<{ id: string; message: string }> {
    await this.photoService.deletePhoto(id);
    return { id, message: 'Photo deleted successfully.' };
  }
}
