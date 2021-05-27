import { Component, OnInit } from '@angular/core';
import { QuizService } from './../services/quiz.service';
// import { mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  correctAnswers = 0;

  notCorrectAnswers = 0;

  category = '';

  difficulty = '';

  quizO = '';

  constructor(private quizService: QuizService) {}

  // display Quiz statistic
  ngOnInit(): void {
    this.quizService.currentGameId.subscribe((id: any) => {
      this.quizO = id;
      this.quizService.getQuiz(id).subscribe((quiz: any) => {
        this.correctAnswers = quiz.game.numberCorrectAnswers;
        this.notCorrectAnswers = quiz.game.numberNotCorrectAnswers;
        this.quizService
          .getCategory(quiz.game.category)
          .subscribe((categoryObj: any) => {
            this.category = categoryObj.results[0].display;
          });
        this.quizService
          .getDifficulty(quiz.game.difficulty)
          .subscribe((difficultyObj: any) => {
            this.difficulty = difficultyObj.results[0].display;
          });
      });
    });
  }

  // start new Quiz Game
  startNewQuiz(): void {
    this.quizService.startNewQuiz();
  }
}
