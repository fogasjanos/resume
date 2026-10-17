import { TestBed } from '@angular/core/testing';
import { ResumeLabelValuesComponent } from './resume-label-values.component';

describe('ResumeLabelValuesComponent', () => {
  it('renders its supplied résumé data', async () => {
    await TestBed.configureTestingModule({ imports: [ResumeLabelValuesComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ResumeLabelValuesComponent);
    fixture.componentRef.setInput('labelValues', { label: 'Interests', values: ['Reading'] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li')?.textContent).toContain('Reading');
  });
});
