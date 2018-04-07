import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { ExerciseService } from './exercise.service';
import { Workout } from './workout';
import { Exercise } from './exercise';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  runningWorkout: Workout;
  editingWorkout: Workout;
  editingExercise: Exercise;
  activePanel: string;
  loginPath: string;

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private appService: AppService
  ) {
    const location = encodeURIComponent(window.location.href);
    this.loginPath = appService.apiHost + "/login/token?redirect_to=" + location;
    const token = this.getToken();
    if (token !== "") {
      this.appService.login(token);
    }
  }

  ngOnInit() {
    this.appService.authenticated$.subscribe(data => console.log(data));
    this.exerciseService.editingExercise$.subscribe(data => this.setEditingExercise(data));
    this.workoutService.selectedWorkout$.subscribe(data => this.setRunningWorkout(data));
    this.workoutService.editingWorkout$.subscribe(data => this.setEditingWorkout(data));
    this.setActivePanel();
  }

  setEditingWorkout(workout) {
    this.editingWorkout = workout;
    this.setActivePanel();
  }

  setEditingExercise(exercise) {
    this.editingExercise = exercise;
    this.setActivePanel();
  }

  setRunningWorkout(workout) {
    this.runningWorkout = workout;
    this.setActivePanel();
  }

  setActivePanel() {
    if (this.editingWorkout !== null && this.editingWorkout !== undefined) {
      this.activePanel = "editingWorkout";
      return;
    }

    if (this.editingExercise !== null && this.editingExercise !== undefined) {
      this.activePanel = "editingExercise";
      return;
    }

    this.activePanel = "runningWorkout";
  }

  private getToken(): string {
    const url = new URL(window.location.href);
    const query = url.search;
    const param = "token=";
    return query.substring(query.indexOf(param) + param.length);
  }
}
