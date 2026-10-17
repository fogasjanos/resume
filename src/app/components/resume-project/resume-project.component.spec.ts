import { TestBed } from '@angular/core/testing';
import { ResumeProjectComponent } from './resume-project.component';

describe('ResumeProjectComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeProjectComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeProjectComponent);
    fixture.componentRef.setInput('project', { label: 'Projects', projects: [{ name: 'Example Project', description: 'A useful tool.' }] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li')?.textContent).toContain('A useful tool.');
  });
});
