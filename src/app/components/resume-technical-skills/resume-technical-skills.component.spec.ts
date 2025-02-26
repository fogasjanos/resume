import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeEducationComponent as ResumeTechnialSkillComponent } from './resume-technical-skills.component';

describe('ResumeEducationComponent', () => {
  let component: ResumeTechnialSkillComponent;
  let fixture: ComponentFixture<ResumeTechnialSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeTechnialSkillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeTechnialSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
