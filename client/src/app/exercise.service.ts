import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Exercise } from './exercise';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExerciseService {
  private workout: Workout;
  private exercisesSource = new Subject<Exercise[]>();
  public exercises$ = this.exercisesSource.asObservable();

  constructor(private http: HttpClient) { }

  public fromWorkout(workout: Workout) {
    this.workout = workout;
    if (workout.exercises === undefined || workout.exercises === null) {
      this.exercisesSource.next([]);
    } else {
      this.exercisesSource.next(workout.exercises);
    }
  }

  public createExercise(exercise: Exercise) {
    this.http.post(`http://localhost:3000/workouts/${this.workout._id}/exercises`, exercise)
      .subscribe(data => {
        this.fromWorkout(<Workout>data);
      });
  }
}
