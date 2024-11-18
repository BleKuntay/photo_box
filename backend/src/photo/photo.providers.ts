import { DataSource } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { Folder } from '../folder/entities/folder.entity';

export const photoProviders = [
  {
    provide: 'PHOTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'FOLDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Folder),
    inject: ['DATA_SOURCE'],
  },
];
