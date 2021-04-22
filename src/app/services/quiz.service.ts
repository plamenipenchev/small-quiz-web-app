/* eslint-disable no-param-reassign */
import { Quiz } from './../domain/quiz';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from './../././../assets/config';
import { NavigationService } from './../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quiz: any;

  questions: any;

  constructor(
    private httpClient: HttpClient,
    private navigateService: NavigationService
  ) {}

  // create quiz object
  createQuiz(category: number, difficulty: number): void {
    this.quiz = new Quiz(category, difficulty);
  }

  // // call API in order to retrieve questions based on category and difficulty
  // getQuestions() {
  //   return this.httpClient.get(
  //     `https://opentdb.com/api.php?amount=5&category=${this.quiz.category}&difficulty=${this.quiz.difficulty}&type=multiple`
  //   );
  // }

  // server with mongo db
  getQuestions() {
    return this.httpClient.get(
      `${URLS.localHost}${URLS.questions}${this.quiz.category}/${this.quiz.difficulty}`
    );
  }

  getCategories() {
    return this.httpClient.get(`${URLS.localHost}${URLS.categories}`);
  }

  getDifficulties() {
    return this.httpClient.get(`${URLS.localHost}${URLS.difficulties}`);
  }

  // mark answers options with true and false, later use it in background directive.
  formatQuestions(apiQuestion: any) {
    let answersLsTmp = apiQuestion.incorrect_answers;
    const answerIndex = Math.floor(Math.random() * 3);
    let correct = false;

    answersLsTmp.splice(answerIndex, 0, apiQuestion.correct_answer);
    answersLsTmp = answersLsTmp.map((answerOption: string) => {
      // eslint-disable-next-line no-unused-expressions
      answerOption === apiQuestion.correct_answer
        ? (correct = true)
        : (correct = false);
      return {
        answerOption: this.formatText(answerOption),
        correct
      };
    });

    apiQuestion.question = this.formatText(apiQuestion.question);
    apiQuestion.answers = answersLsTmp;

    return apiQuestion;
  }

  // replace some special characters in questions/answers text, they are stored like this in API
  // eslint-disable-next-line class-methods-use-this
  formatText(text: string): string {
    let textFormated = '';

    textFormated = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");

    return textFormated;
  }

  // start new Quiz Game
  startNewQuiz(): void {
    this.navigateService.navigateInitialize();
  }
}
