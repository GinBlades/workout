import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {
  model: Workout;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService.editingWorkout$.subscribe(data => {
      if (data !== undefined || data !== null) {
        this.model = data;
      }
    });
  }

  submit() {
    if (this.model._id) {
      this.workoutService.updateWorkout(this.model);
    } else {
      this.workoutService.createWorkout(this.model);
    }
    this.cancel();
  }

  cancel() {
    this.workoutService.setEditingWorkout(null);
  }
}
