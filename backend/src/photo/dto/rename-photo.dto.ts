import { IsOptional, IsString } from 'class-validator';

export class RenamePhotoDto {
  @IsString()
  @IsOptional()
  newName?: string;
}
