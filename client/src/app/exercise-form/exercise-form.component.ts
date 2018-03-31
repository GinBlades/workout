import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  model: Exercise;

  constructor(private exerciseService: ExerciseService) {
    this.model = new Exercise("", "", 30, 1, false);
  }

  ngOnInit() {
    this.exerciseService.editingExercise$.subscribe(data => {
      if (data !== undefined || data !== null) {
        this.model = data;
      }
    });
  }

  submit() {
    console.log(this.model);
  }

  cancel() {
    this.exerciseService.setEditingExercise(null);
  }
}
