import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class answerChallengeInput {
  @IsString()
  @IsNotEmpty({ message: 'challengeId cam not be empity' })
  challengeId: string;

  @IsString()
  @IsNotEmpty({ message: 'repositoryUrl cam not be empity' })
  repositoryUrl: string;
}
