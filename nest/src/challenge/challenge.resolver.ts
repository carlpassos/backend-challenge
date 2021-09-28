import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Challenge } from './challenge.entity';
import { ChallengeService } from './challenge.service';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';

@Resolver('Challenge')
export class ChallengeResolver {
  constructor(private challengeService: ChallengeService) {}

  @Query(() => [Challenge])
  async challenges(): Promise<Challenge[]> {
    const challenges = await this.challengeService.findAllChallenges();
    return challenges;
  }

  @Query(() => Challenge)
  async challenge(@Args('id') id: string): Promise<Challenge> {
    const challenge = await this.challengeService.findChallengeById(id);
    return challenge;
  }

  @Mutation(() => Challenge)
  async createChallenge(
    @Args('data') data: CreateChallengeInput,
  ): Promise<Challenge> {
    const challenge = await this.challengeService.createChallenge(data);
    return challenge;
  }

  @Mutation(() => Challenge)
  async updateChallenge(
    @Args('id') id: string,
    @Args('data') data: UpdateChallengeInput,
  ): Promise<Challenge> {
    const challenge = await this.challengeService.updateChallenge(id, data);
    return challenge;
  }

  @Mutation(() => Challenge)
  async deleteChallenge(@Args('id') id: string): Promise<Challenge> {
    const challenge = await this.challengeService.deleteChallenge(id);
    return challenge;
  }
}
