import { User } from '../../user/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';
import { Answer as Answers } from '@prisma/client';

export class Answer implements Answers {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  questionId: string;
  user: User;
  question: Question;
}
