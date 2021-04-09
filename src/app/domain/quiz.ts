export class Quiz {
  category: string = '';
  difficulty: string = '';
  status: string = 'pending';
  numberCorrectAnswers: number = 0;
  numberNotCorrectAnswers: number = 0;
  questionsAnswersLs: any = [];

  get_category() {
    let result: string = '';
    switch (this.category) {
      case "11":
        result = 'Entertainment: Film'
        break;
      case '12':
        result = 'Entertainment: Music'
        break;
      case '18':
        result = 'Science: Computers'
        break;
      case '21':
        result = 'Sports'
        break;
      case "23":
        result = 'History'
        break;
      default:
        result = 'None'
        break;
    }
    return result;
  }

  get_difficulty() {
    return this.difficulty.toUpperCase();
  }

  constructor() { }
}
