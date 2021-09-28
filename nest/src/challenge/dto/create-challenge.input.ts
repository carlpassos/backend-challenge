import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateChallengeInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  description: string;
}
