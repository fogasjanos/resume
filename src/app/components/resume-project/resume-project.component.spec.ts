import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeProjectComponent } from './resume-project.component';

describe('ResumeProjectComponent', () => {
  let component: ResumeProjectComponent;
  let fixture: ComponentFixture<ResumeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
