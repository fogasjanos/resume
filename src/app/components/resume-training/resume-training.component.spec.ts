import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTrainingComponent } from './resume-training.component';

describe('ResumeTrainingComponent', () => {
  let component: ResumeTrainingComponent;
  let fixture: ComponentFixture<ResumeTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
