import { Observable, BehaviorSubject } from 'rxjs';
/* eslint-disable no-param-reassign */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from './../././../assets/config';
import { NavigationService } from './../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public editDataDetails: any = [];

  private observer = new BehaviorSubject(this.editDataDetails);

  currentGameId = this.observer.asObservable();

  constructor(
    private httpClient: HttpClient,
    private navigateService: NavigationService
  ) {}

  // set quiz id
  emitQuizId(quizId: string): void {
    this.observer.next(quizId);
  }

  // create quiz object
  createQuiz(category: number, difficulty: number): Observable<unknown> {
    return this.httpClient.post(`${URLS.localHost}${URLS.games}`, {
      category,
      difficulty
    });
  }

  // upate quiz object
  updateQuiz(
    id: string,
    status: string,
    numberCorrectAnswers: number,
    numberNotCorrectAnswers: number,
    questionsAnswersLs: Array<unknown>
  ): Observable<unknown> {
    return this.httpClient.patch(`${URLS.localHost}${URLS.games}/${id}`, {
      status,
      numberCorrectAnswers,
      numberNotCorrectAnswers,
      questionsAnswersLs
    });
  }

  // get current game
  getQuiz(quizId: string): Observable<unknown> {
    return this.httpClient.get(`${URLS.localHost}${URLS.games}/${quizId}`);
  }

  // server with mongo db
  getQuestions(quiz: any): Observable<unknown> {
    return this.httpClient.get(
      `${URLS.localHost}${URLS.questions}${quiz.game.category}/${quiz.game.difficulty}`
    );
  }

  // Get all categories to initialize the quiz
  getCategoriesList(): Observable<unknown> {
    return this.httpClient.get(`${URLS.localHost}${URLS.categories}`);
  }

  // Get all difficulties to initialize the quiz
  getDifficultiesList(): Observable<unknown> {
    return this.httpClient.get(`${URLS.localHost}${URLS.difficulties}`);
  }

  // Get category by category id
  getCategory(id: number): Observable<unknown> {
    return this.httpClient.get(`${URLS.localHost}${URLS.categories}/${id}`);
  }

  // Get difficulty by difficulty id
  getDifficulty(id: number): Observable<unknown> {
    return this.httpClient.get(`${URLS.localHost}${URLS.difficulties}/${id}`);
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
    this.navigateService.navigateToInitialize();
  }
}
