import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutNewComponent } from './workout-new.component';

describe('WorkoutNewComponent', () => {
  let component: WorkoutNewComponent;
  let fixture: ComponentFixture<WorkoutNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
