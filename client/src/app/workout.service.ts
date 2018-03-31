import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ExerciseService } from './exercise.service';

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

  constructor(private http: HttpClient, private exerciseService: ExerciseService) { }

  public fetchWorkouts() {
    return this.http.get("http://localhost:3000/workouts").subscribe(data => {
      this.setSelectedWorkout(data[0]);
      this.workoutsSource.next(<Workout[]>data);
    });
  }

  public setSelectedWorkout(workout: Workout) {
    this.selectedWorkoutSource.next(workout);
    this.exerciseService.fromWorkout(workout);
  }

  public setEditingWorkout(workout: Workout) {
    this.editingWorkoutSource.next(workout);
  }

  public createWorkout(workout: Workout) {
    return this.http.post("http://localhost:3000/workouts", workout).subscribe(newWorkout => {
      this.workoutsSource.subscribe(workouts => {
        workouts.push(<Workout>newWorkout);
      });
    });
  }

  public updateWorkout(workout: Workout) {
    return this.http.put(`http://localhost:3000/workouts/${workout._id}`, workout)
      .subscribe(updatedWorkout => {
        this.workoutsSource.subscribe(workouts => {
          let index = workouts.map(wo => wo._id).indexOf(workout._id);
          workouts.splice(index, 1, <Workout>updatedWorkout);
        });
      })
  }

  public deleteWorkout(workout: Workout) {
    return this.http.delete(`http://localhost:3000/workouts/${workout._id}`).subscribe(empty => {
      this.workoutsSource.subscribe(workouts => {
        let index = workouts.map(wo => wo._id).indexOf(workout._id);
        workouts.splice(index, 1);
      });
    })
  }
}
