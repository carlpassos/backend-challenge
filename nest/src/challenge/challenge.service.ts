import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { CreateChallengeInput } from './dto/create-challenge.input';
import { UpdateChallengeInput } from './dto/update-challenge.input';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  async findAllChallenges(): Promise<Challenge[]> {
    const challenges = await this.challengeRepository.find();

    return challenges;
  }

  async findChallengeById(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne(id);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge;
  }

  async createChallenge(data: CreateChallengeInput): Promise<Challenge> {
    const challenge = this.challengeRepository.create(data);

    const challengeSaved = await this.challengeRepository.save(challenge);

    if (!challengeSaved) {
      throw new InternalServerErrorException('Challenge can not be created');
    }

    return challengeSaved;
  }

  async updateChallenge(id: string, data: UpdateChallengeInput): Promise<any> {
    const challenge = await this.findChallengeById(id);
    await this.challengeRepository.update(challenge.id, {
      ...data,
    });

    const challengeUpdated = this.challengeRepository.create({
      ...challenge,
      ...data,
    });

    return challengeUpdated;
  }

  async deleteChallenge(id: string): Promise<any> {
    const challenge = await this.findChallengeById(id);

    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    await this.challengeRepository.delete(challenge.id);

    return challenge;
  }
}
