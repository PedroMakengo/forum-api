import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import type { PrismaService } from 'src/database/prisma.service';
import { connect } from 'http2';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(
    createAnswerDto: CreateAnswerDto,
    userId: string,
    questionId: string,
  ) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: userId },
      },
      question: {
        connect: { id: questionId },
      },
    };

    return await this.prisma.answer.create({
      data: newAnswer,
    });
  }

  async findAll() {
    return await this.prisma.answer.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    return await this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.answer.delete({
      where: { id },
    });
  }
}
