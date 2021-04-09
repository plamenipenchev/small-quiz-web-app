import { Quiz } from './../domain/quiz';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quiz: any;
  questions: any;

  constructor(private httpClient: HttpClient, private route: Router) {}

  // create quiz object
  createQuiz(initializeForm: any) {
    this.quiz = new Quiz();
    this.quiz.category = initializeForm.controls['categories'].value;
    this.quiz.difficulty = initializeForm.controls['difficulty'].value;
  }

  // //call API in order to retrieve questions based on category and difficulty
  // get_questions() {
  //   return this.httpClient.get(
  //     `https://opentdb.com/api.php?amount=5&category=${this.quiz.category}&difficulty=${this.quiz.difficulty}&type=multiple`
  //   );
  // }

  // server with mongo db
  get_questions() {
    return this.httpClient.get(
      `http://localhost:3000/questions/5/${this.quiz.get_category()}/${this.quiz.difficulty}`
    );
  }

  //mark answers options with true and false, later use it in background directive.
  format_questions(apiQuestion: any) {
    let answersLsTmp = apiQuestion.incorrect_answers;
    const answerIndex = Math.floor(Math.random() * 3);
    let correct: boolean = false;

    answersLsTmp.splice(answerIndex, 0, apiQuestion.correct_answer);
    answersLsTmp = answersLsTmp.map((answerOption: string) => {
      answerOption === apiQuestion.correct_answer
        ? (correct = true)
        : (correct = false);
      return {
        answerOption: this.format_text(answerOption),
        correct
      };
    });

    apiQuestion.question = this.format_text(apiQuestion.question);
    apiQuestion.answers = answersLsTmp;

    return apiQuestion;
  }

  // replace some special characters in questions/answers text, they are stored like this in API
  format_text(text: string) {
    let textFormated: string = '';

    textFormated = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");

    return textFormated;
  }

  // start new Quiz Game
  startNewQuiz() {
    this.route.navigate(['/initialize']);
  }
}
