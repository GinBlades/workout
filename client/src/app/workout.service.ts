import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ExerciseService } from './exercise.service';
import { environment } from "../environments/environment";
import { AppService } from './app.service';

@Injectable()
export class WorkoutService {
  // BehaviorSubject returns a value even if no new 'next' is called.
  // This allows the array to be pushed to after aa new workout is created.
  private workoutsSource = new BehaviorSubject<Workout[]>([]);
  public workouts$ = this.workoutsSource.asObservable();

  private selectedWorkoutSource = new Subject<Workout>();
  public selectedWorkout$ = this.selectedWorkoutSource.asObservable();

  private editingWorkoutSource = new BehaviorSubject<Workout>(null);
  public editingWorkout$ = this.editingWorkoutSource.asObservable();

  constructor(
    private http: HttpClient,
    private exerciseService: ExerciseService,
    private appService: AppService
  ) { }

  public fetchWorkouts() {
    return this.http.get(`${environment.apiHost}/workouts`, this.appService.headerOptions()).subscribe(data => {
      this.setSelectedWorkout(data[0]);
      this.workoutsSource.next(<Workout[]>data);
    });
  }

  public setSelectedWorkout(workout: Workout) {
    this.http.get(`${environment.apiHost}/workouts/${workout._id}`, this.appService.headerOptions()).subscribe(data => {
      this.selectedWorkoutSource.next(<Workout>data);
      this.exerciseService.fromWorkout(<Workout>data);
    });
  }

  public setEditingWorkout(workout: Workout) {
    this.editingWorkoutSource.next(workout);
  }

  public createWorkout(workout: Workout) {
    return this.http.post(`${environment.apiHost}/workouts`, workout, this.appService.headerOptions()).subscribe(newWorkout => {
      this.workoutsSource.subscribe(workouts => {
        workouts.push(<Workout>newWorkout);
      });
    });
  }

  public updateWorkout(workout: Workout) {
    return this.http.put(`${environment.apiHost}/workouts/${workout._id}`, workout, this.appService.headerOptions())
      .subscribe(updatedWorkout => {
        this.workoutsSource.subscribe(workouts => {
          let index = workouts.map(wo => wo._id).indexOf(workout._id);
          workouts.splice(index, 1, <Workout>updatedWorkout);
        });
      })
  }

  public deleteWorkout(workout: Workout) {
    return this.http.delete(`${environment.apiHost}/workouts/${workout._id}`, this.appService.headerOptions()).subscribe(empty => {
      this.workoutsSource.subscribe(workouts => {
        let index = workouts.map(wo => wo._id).indexOf(workout._id);
        workouts.splice(index, 1);
      });
    })
  }
}
