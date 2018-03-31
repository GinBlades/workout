import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-new',
  templateUrl: './workout-new.component.html',
  styleUrls: ['./workout-new.component.scss']
})
export class WorkoutNewComponent implements OnInit {
  public model = new Workout("", "");
  public editing = false;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
  }

  addWorkout() {
    console.log(this.model);
    this.workoutService.createWorkout(this.model).subscribe(data => {
      this.workoutService.addWorkout(<Workout>data);
      this.model = new Workout("", "");
    })
  }
}
