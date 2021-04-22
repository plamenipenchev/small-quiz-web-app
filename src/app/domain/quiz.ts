export class Quiz {
  category: number;

  difficulty: number;

  status = 'pending';

  numberCorrectAnswers = 0;

  numberNotCorrectAnswers = 0;

  questionsAnswersLs: unknown = [];

  constructor(category: number, difficulty: number) {
    this.category = category;
    this.difficulty = difficulty;
  }
}
