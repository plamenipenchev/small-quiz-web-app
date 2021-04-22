import { Component, OnInit } from '@angular/core';
import { QuizService } from './../services/quiz.service';

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

  constructor(private quizService: QuizService) {}

  // display Quiz statistic
  ngOnInit(): void {
    this.correctAnswers = this.quizService.quiz.numberCorrectAnswers;
    this.notCorrectAnswers = this.quizService.quiz.numberNotCorrectAnswers;
    this.category = this.quizService.quiz.category;
    this.difficulty = this.quizService.quiz.difficulty;
  }

  // start new Quiz Game
  startNewQuiz() {
    this.quizService.startNewQuiz();
  }
}
