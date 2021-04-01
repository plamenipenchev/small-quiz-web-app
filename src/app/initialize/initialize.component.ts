import { QuizService } from './../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.css'],
})

export class InitializeComponent implements OnInit {
  isValidFormSubmitted = false;

  constructor(private quizService: QuizService, private route: Router) { }

  ngOnInit(): void { }

  // submit form results
  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.quizService.createQuiz(form);
    this.route.navigate(['/questions']);
  }
}
