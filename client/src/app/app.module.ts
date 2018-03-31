import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { RunnerComponent } from './runner/runner.component';
import { WorkoutService } from './workout.service';
import { WorkoutNewComponent } from './workout-new/workout-new.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    ExercisesComponent,
    RunnerComponent,
    WorkoutNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    WorkoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
