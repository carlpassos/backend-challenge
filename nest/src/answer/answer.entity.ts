import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @IsUUID()
  challenge_id: string;

  @Column()
  repository_url: string;

  @Column()
  @Field()
  status: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  grade?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
