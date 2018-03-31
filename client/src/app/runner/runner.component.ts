import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnInit {
  currentExercise: Exercise;
  currentWorkout: Workout;

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseService.currentExercise$
      .subscribe(data => this.currentExercise = data);
    this.workoutService.selectedWorkout$
      .subscribe(data => this.currentWorkout = data);
  }

}
