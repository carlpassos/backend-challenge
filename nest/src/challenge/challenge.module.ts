import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeResolver } from './challenge.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Answer } from 'src/answer/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],

  providers: [ChallengeService, ChallengeResolver],
})
export class ChallengeModule {}
