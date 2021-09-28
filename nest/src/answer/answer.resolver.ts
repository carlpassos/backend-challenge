import { Inject, OnModuleInit, Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import { answerChallengeInput } from './dto/answer-challenge.input';

@Resolver()
export class AnswerResolver implements OnModuleInit {
  constructor(
    @Inject('CHALLENGE_SERVICE')
    private clientKafka: ClientKafka,
    private answerService: AnswerService,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('challenge.correction');
    await this.clientKafka.connect();
  }

  @Mutation(() => Answer)
  async answerChallenge(
    @Args('data') data: answerChallengeInput,
  ): Promise<Answer> {
    const answer = await this.answerService.createAnswer(data);

    if (answer.status === 'Pending') {
      this.clientKafka
        .send(
          'challenge.correction',
          JSON.stringify({
            submissionId: answer.id,
            repositoryUrl: answer.repository_url,
          }),
        )
        .subscribe((response) => {
          this.answerService.updateAnswer(response);
        });
    }

    return answer;
  }
}
