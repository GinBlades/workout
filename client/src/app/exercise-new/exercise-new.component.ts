import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-new',
  templateUrl: './exercise-new.component.html',
  styleUrls: ['./exercise-new.component.scss']
})
export class ExerciseNewComponent implements OnInit {
  editing = false;
  model = new Exercise("", "", 30, 1, false);

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  addExercise() {
    this.exerciseService.createExercise(this.model);
    this.model = new Exercise("", "", 30, 1, false);
  }
}
