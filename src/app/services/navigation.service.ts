import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private route: Router) {}

  navigateInitialize(): void {
    this.route.navigate(['/initialize']);
  }

  navigateQuestions(): void {
    this.route.navigate(['/questions']);
  }

  navigateResults(): void {
    this.route.navigate(['/results']);
  }
}
