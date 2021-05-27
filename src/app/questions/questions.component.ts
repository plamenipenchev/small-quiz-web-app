/* eslint-disable no-plusplus */
import { QuizService } from './../services/quiz.service';
import { NavigationService } from './../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any = [];

  currentQuestion = 0;

  timer: any = { leftTime: '15' };

  timerLeft = 30;

  quizId = '';

  quizStatus = 'pending';

  numberCorrectAnswers = 0;

  numberNotCorrectAnswers = 0;

  questionsAnswersLs: Array<unknown> = [];

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private navigateService: NavigationService
  ) {}

  // load questions
  ngOnInit(): void {
    this.quizService.currentGameId.subscribe((id: any) => {
      this.quizService.getQuiz(id).subscribe((result) => {
        this.quizId = id;
        this.quizService
          .getQuestions(result)
          .subscribe((questionsData: any) => {
            questionsData.results.map((apiQuestion: any) => {
              this.quizService.formatQuestions(apiQuestion);
              return apiQuestion;
            });
            this.questions = questionsData.results;
          });
        // Initialize timer, notify property to trigger event
        this.timer = { leftTime: '15', notify: [1] };
      });
    });

    // this.quizService.getQuestions(quiz).subscribe((questionsData: any) => {
    //   questionsData.results.map((apiQuestion: any) => {
    //     this.quizService.formatQuestions(apiQuestion);
    //     return apiQuestion;
    //   });
    //   this.questions = questionsData.results;
    // });
    // // Initialize timer, notify property to trigger event
    // this.timer = { leftTime: '15', notify: [1] };
  }

  // treat question answer
  onAnswer(question: any, answer: any, event: any): void {
    if (event.type === 'change' || event.action === 'notify') {
      setTimeout(() => {
        if (this.currentQuestion === this.questions.length - 1) {
          this.quizStatus = 'completed';
          this.quizService.emitQuizId(this.quizId);
          this.navigateService.navigateToResults();
        }

        this.timer = { leftTime: '15', notify: [1] };

        // eslint-disable-next-line no-unused-expressions
        answer.correct
          ? this.numberCorrectAnswers++
          : this.numberNotCorrectAnswers++;

        const obj = {
          question: question.question,
          answer: answer.answerOption,
          correct: answer.correct,
          category: question.category
        };

        this.questionsAnswersLs.push(obj);

        this.quizService
          .updateQuiz(
            this.quizId,
            this.quizStatus,
            this.numberCorrectAnswers,
            this.numberNotCorrectAnswers,
            this.questionsAnswersLs
          )
          .subscribe((result) => {
            console.log(result);
          });
        this.currentQuestion++;
      }, 500);
    }
  }

  startNewQuiz(): void {
    this.quizService.startNewQuiz();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Do you confirm you want to quit the current quiz?'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.quizService.startNewQuiz();
      }
    });
  }
}
