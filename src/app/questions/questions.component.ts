import { QuizService } from './../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit {
  quiz: any;
  questions: any = [];
  currentQuestion: number = 0;
  timer: any = { leftTime: '15' };
  timerLeft: number = 30;

  constructor(
    private quizService: QuizService,
    private route: Router,
    private dialog: MatDialog
  ) { }

  // load questions
  ngOnInit(): void {
    this.quizService.get_questions().subscribe((questionsData: any) => {
      questionsData.results.map((apiQuestion: any) => {
        this.quizService.format_questions(apiQuestion);
      });
      this.questions = questionsData.results;
    });
    //Initialize timer, notify property to trigger event 
    this.timer = { leftTime: '15', notify: [1] };
  }

  // treat question answer
  onAnswer(question: any, answer: any, event: any) {
    if (event.type === "change" || event.action === 'notify') {
      setTimeout(() => {
        if (this.currentQuestion === this.questions.length - 1) {
          this.quizService.quiz.status = 'completed';
          this.route.navigate(['/results']);
        }

        this.currentQuestion++;
        this.timer = { leftTime: '15', notify: [1] };

        answer.correct
          ? this.quizService.quiz.numberCorrectAnswers++
          : this.quizService.quiz.numberNotCorrectAnswers++;

        const obj = {
          question: question.question,
          answer: answer.answer_option,
          correct: answer.correct,
          category: question.category,
        };
        this.quizService.quiz.questionsAnswersLs.push(obj);
      }, 500);
    }
  }

  startNewQuiz() {
    this.quizService.startNewQuiz();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: 'Do you confirm you want to quit the current quiz?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.quizService.startNewQuiz();
      }
    });
  }
}
