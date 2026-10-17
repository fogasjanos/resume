import { TestBed } from '@angular/core/testing';
import { ResumeIconComponent } from './resume-icon.component';

describe('ResumeIconComponent', () => {
  for (const name of ['fa-user', 'fa-solid fa-briefcase experience', 'fa-brands fa-github']) {
    it(`renders ${name} as decorative vector paths without text`, async () => {
      await TestBed.configureTestingModule({ imports: [ResumeIconComponent] }).compileComponents();
      const fixture = TestBed.createComponent(ResumeIconComponent);
      fixture.componentRef.setInput('name', name);
      fixture.detectChanges();
      const element = fixture.nativeElement as HTMLElement;
      const svg = element.querySelector('svg');
      expect(svg?.getAttribute('role')).toBe('presentation');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('focusable')).toBe('false');
      expect(svg?.querySelector('path')?.getAttribute('d')?.length).toBeGreaterThan(0);
      expect(svg?.querySelector('text, foreignObject, image')).toBeNull();
      expect(element.textContent?.trim()).toBe('');
    });
  }

  it('updates the drawing when the icon changes and handles unknown identifiers', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeIconComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeIconComponent);
    fixture.componentRef.setInput('name', 'fa-user');
    fixture.detectChanges();
    const first = fixture.nativeElement.querySelector('path').getAttribute('d');
    fixture.componentRef.setInput('name', 'fa-list');
    fixture.detectChanges();
    const fallback = fixture.nativeElement.querySelector('path').getAttribute('d');
    expect(fallback).not.toBe(first);
    fixture.componentRef.setInput('name', 'fa-unknown colorLightBlue');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('path').getAttribute('d')).toBe(fallback);
  });
});
