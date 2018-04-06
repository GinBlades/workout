import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { RunnerComponent } from './runner/runner.component';
import { WorkoutService } from './workout.service';
import { ExerciseService } from './exercise.service';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    ExercisesComponent,
    RunnerComponent,
    ExerciseFormComponent,
    WorkoutFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    WorkoutService,
    ExerciseService,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
