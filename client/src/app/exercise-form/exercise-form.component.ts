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
    console.log("Init");
    this.exerciseService.editingExercise$.subscribe(data => {
      if (data !== undefined || data !== null) {
        this.model = data;
      }
    });
  }

  submit() {
    if (this.model._id) {
      this.exerciseService.updateExercise(this.model);
    } else {
      this.exerciseService.createExercise(this.model);
    }
    this.cancel();
  }

  cancel() {
    this.exerciseService.setEditingExercise(null);
  }
}
