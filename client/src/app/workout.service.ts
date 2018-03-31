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

  public setWorkouts(workouts: Workout[]) {
    this.workouts = workouts;
  }

  public addWorkout(workout: Workout) {
    this.workouts.push(workout);
  }

  public setSelectedWorkout(workout: Workout) {
    this.selectedWorkoutSource.next(workout);
  }

  public createWorkout(workout: Workout) {
    return this.http.post("http://localhost:3000/workouts", workout);
  }
}
