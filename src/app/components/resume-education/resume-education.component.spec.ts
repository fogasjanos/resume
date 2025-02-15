import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeEducationComponent } from './resume-education.component';

describe('ResumeEducationComponent', () => {
  let component: ResumeEducationComponent;
  let fixture: ComponentFixture<ResumeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
