import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
