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
import { ExerciseNewComponent } from './exercise-new/exercise-new.component';
import { ExerciseService } from './exercise.service';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    ExercisesComponent,
    RunnerComponent,
    WorkoutNewComponent,
    ExerciseNewComponent,
    ExerciseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    WorkoutService,
    ExerciseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
