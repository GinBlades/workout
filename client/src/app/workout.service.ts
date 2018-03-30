import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WorkoutService {
  private workouts: Workout[];
  public selectedWorkout: Workout;

  private selectedWorkoutSource = new Subject<Workout>();
  public selectedWorkout$ = this.selectedWorkoutSource.asObservable();

  constructor(private http: HttpClient) { }

  public fetchWorkouts() {
    return this.http.get("http://localhost:3000/workouts");
  }

  public getWorkouts() {
    return this.workouts;
  }

  public setWorkouts(workouts) {
    this.workouts = workouts;
  }

  public setSelectedWorkout(workout: Workout) {
    this.selectedWorkoutSource.next(workout);
  }
}
