import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { ExerciseService } from './exercise.service';
import { Workout } from './workout';
import { Exercise } from './exercise';

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

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseService.editingExercise$.subscribe(data => this.setEditingExercise(data));
    this.workoutService.selectedWorkout$.subscribe(data => this.setRunningWorkout(data));
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
}
