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
    this.workoutService.fetchWorkouts().subscribe(data => {
      this.workouts = <Workout[]>data
      this.workoutService.setSelectedWorkout(this.workouts[0]);
    });
  }

  selectWorkout(workout) {
    this.workoutService.setSelectedWorkout(workout);
  }
}
