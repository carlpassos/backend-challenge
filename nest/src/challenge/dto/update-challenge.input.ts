import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateChallengeInput {
  @IsString()
  // @IsNotEmpty({message: 'Este campo não pode estar vazio'})
  @IsOptional()
  title?: string;

  @IsString()
  // @IsNotEmpty({message: 'Este campo não pode estar vazio'})
  @IsOptional()
  description?: string;
}
