import { IsOptional, IsUUID } from 'class-validator';

export class MovePhotoDto {
  @IsUUID()
  @IsOptional()
  folderId?: string;
}
