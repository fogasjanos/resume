import { TestBed } from '@angular/core/testing';
import { ResumeLanguageComponent } from './resume-language.component';

describe('ResumeLanguageComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeLanguageComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeLanguageComponent);
    fixture.componentRef.setInput('language', {
      label: 'Languages',
      languages: [{ name: 'English', level: 'Professional working proficiency' }],
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li')?.textContent).toContain('Professional working proficiency');
  });
});
