import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../challenge/challenge.entity';
import { Answer } from './answer.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Challenge, Answer]),
    ClientsModule.register([
      {
        name: 'CHALLENGE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'challenge',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'challenge-consumer',
          },
        },
      },
    ]),
  ],
  providers: [AnswerService, AnswerResolver],
})
export class AnswerModule {}
