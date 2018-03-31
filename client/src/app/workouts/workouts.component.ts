import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  public workouts: Workout[];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.workouts$.subscribe(data => this.workouts = <Workout[]>data);
    this.workoutService.fetchWorkouts();
  }

  selectWorkout(workout) {
    this.workoutService.setSelectedWorkout(workout);
  }
}
