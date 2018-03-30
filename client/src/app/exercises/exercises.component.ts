import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  private selectedWorkout: Workout;

  constructor(private workoutService: WorkoutService) {
    workoutService.selectedWorkout$.subscribe(workout => this.selectedWorkout = workout);
  }

  ngOnInit() {
  }
}
