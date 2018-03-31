import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class WorkoutService {
  private workouts: Workout[];

  // BehaviorSubject returns a value even if no new 'next' is called.
  // This allows the array to be pushed to after aa new workout is created.
  private workoutsSource = new BehaviorSubject<Workout[]>([]);
  public workouts$ = this.workoutsSource.asObservable();

  private selectedWorkoutSource = new Subject<Workout>();
  public selectedWorkout$ = this.selectedWorkoutSource.asObservable();

  constructor(private http: HttpClient) { }

  public fetchWorkouts() {
    return this.http.get("http://localhost:3000/workouts").subscribe(data => {
      this.setSelectedWorkout(data[0]);
      this.workoutsSource.next(<Workout[]>data);
    });
  }

  public setSelectedWorkout(workout: Workout) {
    this.selectedWorkoutSource.next(workout);
  }

  public createWorkout(workout: Workout) {
    return this.http.post("http://localhost:3000/workouts", workout).subscribe(newWorkout => {
      this.workoutsSource.subscribe(workouts => {
        workouts.push(<Workout>newWorkout);
      });
    });
  }
}
