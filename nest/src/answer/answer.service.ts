import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Challenge } from '../challenge/challenge.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { answerChallengeInput } from './dto/answer-challenge.input';

type stautsData = 'Pending' | 'Error' | 'Done';

function checkIfValidUUID(str) {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,

    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(data: answerChallengeInput): Promise<Answer> {
    const { challengeId, repositoryUrl } = data;

    let finalRepositoryUrl = repositoryUrl;

    const isValidUUID = checkIfValidUUID(challengeId);

    if (!isValidUUID) {
      throw new ConflictException(
        'You need provide a valid UUID to challenge ID',
      );
    }

    const challenge = this.challengeRepository.findOne(challengeId);
    let status: stautsData = 'Pending';
    let githubApiUrl = repositoryUrl.replace('http://', 'https://');
    finalRepositoryUrl = finalRepositoryUrl.replace('http://', 'https://');
    if (
      !githubApiUrl.startsWith('http://') &&
      githubApiUrl.startsWith('github.com')
    ) {
      githubApiUrl = 'https://' + githubApiUrl;
      finalRepositoryUrl = 'https://' + repositoryUrl;
    }
    githubApiUrl = githubApiUrl.replace('github.com/', 'api.github.com/repos/');

    const isValidGithubUrl = finalRepositoryUrl.startsWith(
      'https://github.com/',
    );

    if (!challenge || !isValidGithubUrl) {
      status = 'Error';
    } else {
      await axios
        .get(githubApiUrl)
        .then()
        .catch(() => {
          status = 'Error';
        });
    }

    const answer = this.answerRepository.create({
      repository_url: finalRepositoryUrl,
      challenge_id: challengeId,
      status: status,
    });

    const answerSaved = await this.answerRepository.save(answer);

    if (!answerSaved) {
      throw new ConflictException('It was not possible to create an answer');
    }

    return answerSaved;
  }

  async updateAnswer(data): Promise<any> {
    const { submissionId, grade, status } = data;

    const formatedData = {
      id: submissionId,
      grade,
      status,
    };

    const answer = await this.answerRepository.findOne(formatedData.id);

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    await this.answerRepository.update(answer.id, {
      ...formatedData,
    });

    const answerUpdated = this.answerRepository.create({
      ...answer,
      ...formatedData,
    });

    return answerUpdated;
  }
}
