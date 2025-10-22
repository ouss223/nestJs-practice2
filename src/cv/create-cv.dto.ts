import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCvDto {
  @IsString()
  name: string;

  @IsString()
  firstname: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  cin?: string;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString({ each: true })
  skillIds?: string[]; 
}