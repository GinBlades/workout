import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercises = [];

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.exerciseService.exercises$.subscribe(data => this.exercises = data);
  }

  editExercise(exercise) {
    this.exerciseService.setEditingExercise(exercise);
  }

  deleteExercise(exercise) {
    if (confirm("Are you sure you want to delete this exercise?")) {
      this.exerciseService.deleteExercise(exercise);
    }
  }

  newExercise() {
    this.exerciseService.setEditingExercise(new Exercise("", "", 30, 1, false));
  }
}
