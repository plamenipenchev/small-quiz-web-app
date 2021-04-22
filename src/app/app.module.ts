import { QuizService } from './services/quiz.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitializeComponent } from './initialize/initialize.component';
import { QuestionsComponent } from './questions/questions.component';
import { ResultsComponent } from './results/results.component';
import { appRoutes } from './routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnswerBackgroundDirective } from './answer-background.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CountdownModule } from 'ngx-countdown';
import { NavigationService } from './services/navigation.service';

@NgModule({
  declarations: [
    AppComponent,
    InitializeComponent,
    QuestionsComponent,
    ResultsComponent,
    AnswerBackgroundDirective,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CountdownModule
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [QuizService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
