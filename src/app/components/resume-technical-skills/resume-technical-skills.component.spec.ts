import { TestBed } from '@angular/core/testing';
import { ResumeTechnicalSkillsComponent } from './resume-technical-skills.component';

describe('ResumeTechnicalSkillsComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeTechnicalSkillsComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeTechnicalSkillsComponent);
    fixture.componentRef.setInput('technicalSkill', {
      label: 'Core Expertise',
      details: [{ label: 'Backend', description: 'Java · Spring Boot' }],
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('dd')?.textContent).toContain('Java · Spring Boot');
  });
});
