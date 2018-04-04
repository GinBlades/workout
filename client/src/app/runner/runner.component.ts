import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnInit {
  currentExercise: Exercise;
  currentWorkout: Workout;
  runner: any;
  tickSoundUrl: string;
  switchSoundUrl: string;

  constructor(private workoutService: WorkoutService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseService.currentExercise$
      .subscribe(data => this.currentExercise = data);
    this.workoutService.selectedWorkout$
      .subscribe(data => this.currentWorkout = data);
    this.tickSoundUrl = this.exerciseService.tickSound;
    this.switchSoundUrl = this.exerciseService.switchSound;
  }

  runWorkout() {
    this.runner = setInterval(() => {
      --this.currentExercise.duration;
      let tick = <HTMLAudioElement>document.getElementById("tick-sound");
      tick.volume = 0.3;
      tick.play();
      if (this.currentExercise.duration === 0) {
        let switchSound = <HTMLAudioElement>document.getElementById("switch-sound");
        switchSound.volume = 0.6;
        switchSound.play();
        this.exerciseService.nextExercise(this.currentExercise);
      }

      if (this.currentExercise === null) {
        clearInterval(this.runner);
      }
    }, 1000);
  }

  pauseWorkout() {
    clearInterval(this.runner);
  }
}
