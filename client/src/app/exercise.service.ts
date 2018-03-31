import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Exercise } from './exercise';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExerciseService {
  private workout: Workout;
  private exercises: Exercise[];

  private exercisesSource = new Subject<Exercise[]>();
  public exercises$ = this.exercisesSource.asObservable();

  private currentExerciseSource = new Subject<Exercise>();
  public currentExercise$ = this.currentExerciseSource.asObservable();

  private editingExerciseSource = new BehaviorSubject<Exercise>(new Exercise("", "", 30, 1, false));
  public editingExercise$ = this.editingExerciseSource.asObservable();

  constructor(private http: HttpClient) { }

  public fromWorkout(workout: Workout) {
    this.workout = workout;
    if (workout.exercises === undefined || workout.exercises === null) {
      this.exercises = [];
    } else {
      this.exercises = workout.exercises;
    }
    this.exercisesSource.next(this.exercises);

    if (this.exercises.length > 0) {
      this.currentExerciseSource.next(workout.exercises[0]);
    } else {
      this.currentExerciseSource.next(new Exercise("", "", 0, 0, false));
    }
  }

  public createExercise(exercise: Exercise) {
    this.http.post(`http://localhost:3000/workouts/${this.workout._id}/exercises`, exercise)
      .subscribe(data => {
        this.fromWorkout(<Workout>data);
      });
  }

  public setEditingExercise(exercise: Exercise) {
    this.editingExerciseSource.next(exercise);
  }

  public deleteExercise(exercise: Exercise) {
    this.http.delete(`http://localhost:3000/workouts/${this.workout._id}/exercises/${exercise._id}`)
      .subscribe(data => {
        this.fromWorkout(<Workout>data);
      });
  }
}
