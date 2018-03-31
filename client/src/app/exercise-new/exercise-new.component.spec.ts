import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNewComponent } from './exercise-new.component';

describe('ExerciseNewComponent', () => {
  let component: ExerciseNewComponent;
  let fixture: ComponentFixture<ExerciseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
