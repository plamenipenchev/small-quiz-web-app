import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private route: Router) {}

  navigateToInitialize(): void {
    this.route.navigate(['/initialize']);
  }

  navigateToQuestions(): void {
    this.route.navigate(['/questions']);
  }

  navigateToResults(): void {
    this.route.navigate(['/results']);
  }
}
