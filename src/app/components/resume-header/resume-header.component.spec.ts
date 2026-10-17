import { TestBed } from '@angular/core/testing';
import { ResumeHeaderComponent } from './resume-header.component';

describe('ResumeHeaderComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeHeaderComponent);
    fixture.componentRef.setInput('general', { name: 'Sample Engineer', headline: 'Backend Engineering' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Sample Engineer');
  });

  it('renders contact links with correct targets and decorative icons', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeHeaderComponent);
    fixture.componentRef.setInput('general', {
      name: 'Sample Engineer',
      email: { label: 'Email', value: 'engineer@example.com' },
      cell: { label: 'Phone', value: '+420 123 456 789' },
      github: { label: 'GitHub', value: 'https://github.com/example' },
      linkedIn: { label: 'LinkedIn', value: 'https://www.linkedin.com/in/example/' },
      website: { label: 'Website', value: 'https://example.com' },
      city: { label: 'Location', value: 'Prague', url: 'https://example.com/prague' },
    });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(Array.from(element.querySelectorAll('a')).map((a) => a.getAttribute('href'))).toEqual([
      'tel:+420 123 456 789',
      'mailto:engineer@example.com',
      'https://github.com/example',
      'https://www.linkedin.com/in/example/',
      'https://example.com',
    ]);
    expect(element.textContent).toContain('Prague');
    expect(element.querySelectorAll('.contact-icon:not([aria-hidden="true"])').length).toBe(0);
  });
});
