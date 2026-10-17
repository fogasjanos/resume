import { TestBed } from '@angular/core/testing';
import { ResumeEducationComponent } from './resume-education.component';

describe('ResumeEducationComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeEducationComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeEducationComponent);
    fixture.componentRef.setInput('education', {
      label: 'Education',
      schools: [{ degree: 'Computer Science', school: 'Example University', faculty: 'Informatics', year: 2008 }],
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h3')?.textContent).toContain('Computer Science');
  });
});
