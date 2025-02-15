import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeLabelValuesComponent } from './resume-label-values.component';

describe('ResumeHobbiesComponent', () => {
  let component: ResumeLabelValuesComponent;
  let fixture: ComponentFixture<ResumeLabelValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeLabelValuesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeLabelValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
