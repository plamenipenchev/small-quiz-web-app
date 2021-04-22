import { QuizService } from './../services/quiz.service';
import { NavigationService } from './../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.css']
})
export class InitializeComponent implements OnInit {
  isValidFormSubmitted = false;

  categories: any = [];

  difficulties: any = [];

  constructor(
    private quizService: QuizService,
    // private route: Router,
    private navigateService: NavigationService
  ) {}

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((categoriesData: any) => {
      this.categories = categoriesData.results;
    });

    this.quizService.getDifficulties().subscribe((difficultiesData: any) => {
      this.difficulties = difficultiesData.results;
    });
  }

  // submit form results
  onFormSubmit(form: NgForm): void {
    this.isValidFormSubmitted = true;

    if (form.invalid) {
      return;
    }

    const category = form.controls.categories.value;

    const difficulty = form.controls.difficulty.value;

    this.quizService.createQuiz(category, difficulty);

    this.navigateService.navigateQuestions();
  }
}
