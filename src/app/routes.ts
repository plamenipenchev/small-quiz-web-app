import { ResultsComponent } from './results/results.component';
import { QuestionsComponent } from './questions/questions.component';
import { InitializeComponent } from './initialize/initialize.component';
import { Routes } from "@angular/router";

export  const appRoutes:Routes = [
    {path:'initialize', component:InitializeComponent},
    {path:'questions', component:QuestionsComponent},
    {path:'results',component:ResultsComponent},
    {path:'',redirectTo:'/initialize', pathMatch:'full'}
];