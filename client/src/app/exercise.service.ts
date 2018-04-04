import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Exercise } from './exercise';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';
import { environment } from "../environments/environment";

@Injectable()
export class ExerciseService {
  public tickSound = environment.apiHost + "/metronome.mp3";
  public switchSound = environment.apiHost + "/switch.mp3";

  private workout: Workout;
  private exercises: Exercise[];

  private exercisesSource = new Subject<Exercise[]>();
  public exercises$ = this.exercisesSource.asObservable();

  private currentExerciseSource = new Subject<Exercise>();
  public currentExercise$ = this.currentExerciseSource.asObservable();

  private editingExerciseSource = new BehaviorSubject<Exercise>(null);
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
    this.http.post(`${environment.apiHost}/workouts/${this.workout._id}/exercises`, exercise)
      .subscribe(data => {
        this.fromWorkout(<Workout>data);
      });
  }

  public updateExercise(exercise: Exercise) {
    this.http.put(`${environment.apiHost}/workouts/${this.workout._id}/exercises/${exercise._id}`, exercise)
      .subscribe(data => {
        this.fromWorkout(<Workout>data);
      });
  }

  public setEditingExercise(exercise: Exercise) {
    this.editingExerciseSource.next(exercise);
  }

  public deleteExercise(exercise: Exercise) {
    this.http.delete(`${environment.apiHost}/workouts/${this.workout._id}/exercises/${exercise._id}`)
      .subscribe(data => {
        this.fromWorkout(<Workout>data);
      });
  }

  public nextExercise(exercise) {
    let currentIndex = this.workout.exercises.map(e => e._id).indexOf(exercise._id);
    let nextExercise = this.workout.exercises[currentIndex + 1];
    if (nextExercise !== undefined) {
      this.currentExerciseSource.next(nextExercise);
    } else {
      this.currentExerciseSource.next(null);
    }
  }
}
