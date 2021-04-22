/* eslint-disable no-plusplus */
import { QuizService } from './../services/quiz.service';
import { NavigationService } from './../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { Quiz } from '../domain/quiz';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  quiz: Quiz | undefined;

  questions: any = [];

  currentQuestion = 0;

  timer: any = { leftTime: '15' };

  timerLeft = 30;

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private navigateService: NavigationService
  ) {}

  // load questions
  ngOnInit(): void {
    this.quizService.getQuestions().subscribe((questionsData: any) => {
      questionsData.results.map((apiQuestion: any) => {
        this.quizService.formatQuestions(apiQuestion);
      });
      this.questions = questionsData.results;
    });
    // Initialize timer, notify property to trigger event
    this.timer = { leftTime: '15', notify: [1] };
  }

  // treat question answer
  onAnswer(question: any, answer: any, event: any): void {
    if (event.type === 'change' || event.action === 'notify') {
      setTimeout(() => {
        if (this.currentQuestion === this.questions.length - 1) {
          this.quizService.quiz.status = 'completed';
          this.navigateService.navigateResults();
        }

        this.currentQuestion++;
        this.timer = { leftTime: '15', notify: [1] };

        // eslint-disable-next-line no-unused-expressions
        answer.correct
          ? this.quizService.quiz.numberCorrectAnswers++
          : this.quizService.quiz.numberNotCorrectAnswers++;

        const obj = {
          question: question.question,
          answer: answer.answer_option,
          correct: answer.correct,
          category: question.category
        };
        this.quizService.quiz.questionsAnswersLs.push(obj);
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
