import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { Folder } from '../folder/entities/folder.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private readonly photoRepository: Repository<Photo>,

    @Inject('FOLDER_REPOSITORY')
    private readonly folderRepository: Repository<Folder>,
  ) {}

  // GET: get all photo
  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  // GET: get photo by id
  async findOne(id: string): Promise<Photo> {
    const photo = await this.photoRepository.findOneBy({ id });

    if (!photo) {
      throw new NotFoundException('No photo found');
    }

    return photo;
  }

  // POST: post photo
  async postPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const { name, url, folderId } = createPhotoDto;
    let folder = null;

    // Cek folder apakah ada (jika folder id tidak null)
    if (folderId) {
      folder = await this.folderRepository.findOne({ where: { id: folderId } });

      if (!folder) {
        throw new NotFoundException('No folder found');
      }
    }

    // Create foto
    const photo = this.photoRepository.create({
      name,
      url,
      folder,
    });

    return await this.photoRepository.save(photo);
  }

  // PUT: rename photo
  async renamePhoto(id: string, newName: string): Promise<Photo> {
    // Find photo by id
    await this.findOne(id);

    // Update photo name
    await this.photoRepository.update(id, { name: newName });

    // Return photo with new name
    return await this.photoRepository.findOneBy({ id });
  }

  // PATCH: move to folder
  async movePhoto(id: string, folderId: string): Promise<Photo> {
    const photo = await this.photoRepository.findOne({
      where: { id },
      relations: ['folder'],
    });

    if (!photo) {
      throw new NotFoundException('No photo found');
    }

    if (folderId) {
      const folder = await this.folderRepository.findOneBy({ id: folderId });

      if (!folder) {
        throw new NotFoundException('No folder found');
      }

      photo.folder = folder; // Move to folder
    } else {
      photo.folder = null; // Move to root
    }

    return await this.photoRepository.save(photo);
  }

  // DELETE: delete photo
  async deletePhoto(id: string): Promise<{ id: string, message: string }> {
    // Find photo by id
    await this.findOne(id);

    // Delete photo
    await this.photoRepository.delete(id);

    // Return message
    return { id, message: 'Photo has been deleted' };
  }
}
