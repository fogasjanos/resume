import { TestBed } from '@angular/core/testing';
import { ResumeExperienceComponent } from './resume-experience.component';

describe('ResumeExperienceComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeExperienceComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeExperienceComponent);
    fixture.componentRef.setInput('experience', {
      label: 'Experience',
      companies: [{ name: 'Example Company', position: 'Engineer', highlights: ['Built a workflow platform.'] }],
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li')?.textContent).toContain('Built a workflow platform.');
  });

  it('renders legacy continuation entries and gives highlights precedence over description', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeExperienceComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeExperienceComponent);
    fixture.componentRef.setInput('experience', {
      label: 'Experience',
      companies: [
        {
          name: 'Company',
          position: 'Engineer',
          from: 'Nov 2022',
          to: 'Present',
          location: 'Prague',
          url: 'https://example.com',
          highlights: ['New result'],
          description: ['Old result'],
          technologies: 'Java',
        },
        { description: ['Legacy continuation'], technologies: 'Spring' },
      ],
    });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h3 a')?.getAttribute('href')).toBe('https://example.com');
    expect(element.textContent).toContain('Nov 2022');
    expect(element.textContent).toContain('Present');
    expect(element.textContent).toContain('Prague');
    expect(element.textContent).toContain('New result');
    expect(element.textContent).not.toContain('Old result');
    const continuation = element.querySelector('.continuation');
    expect(continuation?.querySelector('header')).toBeNull();
    expect(continuation?.textContent).toContain('Legacy continuation');
    expect(continuation?.textContent).toContain('Spring');
    expect(element.textContent).not.toContain('undefined');
  });

  it('sanitizes bullet HTML while preserving emphasis', async () => {
    spyOn(console, 'warn');
    await TestBed.configureTestingModule({ imports: [ResumeExperienceComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeExperienceComponent);
    fixture.componentRef.setInput('experience', {
      label: 'Experience',
      companies: [{ highlights: ['<strong>Result</strong><a href="javascript:alert(1)">Link</a><img src="x" onerror="alert(2)">'] }],
    });
    fixture.detectChanges();
    const bullet = fixture.nativeElement.querySelector('li') as HTMLElement;
    expect(bullet.querySelector('strong')?.textContent).toBe('Result');
    expect(bullet.querySelector('[onerror]')).toBeNull();
    expect(bullet.querySelector('a')?.getAttribute('href')).not.toBe('javascript:alert(1)');
  });
});
