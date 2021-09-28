import { InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// const { page = null, count = null } = pagging;
// const { title, description } = filter;

interface PaggingData {
  page: number;
  count: number;
}

interface FilterData {
  title?: {
    text: string;
    order: 'ASC' | 'DESC';
  };
  description?: {
    text: string;
    order: 'ASC' | 'DESC';
  };
}

@InputType()
export class FieldInput {
  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  order?: 'ASC' | 'DESC';
}

@InputType()
export class PaggingInput {
  @ValidateNested()
  @IsOptional()
  title?: FieldInput;

  @ValidateNested()
  @IsOptional()
  description?: FieldInput;
}

@InputType()
export class FindAllChallengesFilterInput {
  @IsString()
  @IsOptional()
  pagging?: string;

  @IsString()
  @IsOptional()
  filter?: string;
}

@InputType()
export class FindAllChallengesPaggingInput {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
