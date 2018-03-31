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
}
