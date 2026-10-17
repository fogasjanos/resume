import { TestBed } from '@angular/core/testing';
import { ResumeTrainingComponent } from './resume-training.component';

describe('ResumeTrainingComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeTrainingComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeTrainingComponent);
    fixture.componentRef.setInput('training', { label: 'Training', trainings: [{ name: 'Security', organizer: 'Example Academy' }] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li')?.textContent).toContain('Example Academy');
  });
});
