import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let params: BehaviorSubject<Params>;
  let http: HttpTestingController;
  let previousTitle: string;
  const resume = {
    general: { name: 'Sample Engineer', headline: 'Backend Engineering' },
    summary: 'Building reliable systems.',
    coreSkills: { label: 'Core Expertise', details: [{ label: 'Backend', description: 'Java' }] },
    experience: { label: 'Experience', companies: [{ name: 'Example', highlights: ['Built services.'] }] },
  };
  beforeEach(async () => {
    previousTitle = document.title;
    params = new BehaviorSubject<Params>({});
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { queryParamMap: params.pipe(map(convertToParamMap)) } },
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    document.title = previousTitle;
    http.verify();
  });

  it('renders loaded résumé data and switches aspects', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Loading');
    http.expectOne('resume.json').flush(resume);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Sample Engineer');
    expect(fixture.nativeElement.textContent).toContain('Building reliable systems.');
    expect(fixture.nativeElement.textContent).toContain('Built services.');
    params.next({ a: 'java' });
    http.expectOne('resume-java.json').flush({ ...resume, general: { name: 'Java Engineer' } });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Java Engineer');
    expect(document.title).toBe('Java Engineer - Résumé');
    params.next({ aspect: 'sql' });
    http.expectOne('resume-sql.json').flush(resume);
  });

  it('shows an error when the data cannot be loaded', () => {
    spyOn(console, 'error');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne('resume.json').flush('Missing', { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('could not be found');
  });
  it('shows loading instead of stale content on aspect changes, and ignores unrelated parameters', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne('resume.json').flush(resume);
    fixture.detectChanges();
    params.next({ utm_source: 'example' });
    http.expectNone('resume.json');
    params.next({ a: 'java' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')).toBeNull();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('Loading');
    expect(document.title).toBe('Loading résumé…');
    http.expectOne('resume-java.json').flush(resume);
    params.next({ aspect: 'java', utm_source: 'another' });
    http.expectNone('resume-java.json');
  });

  it('cancels an obsolete request when the aspect changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const oldRequest = http.expectOne('resume.json');
    params.next({ a: 'java' });
    expect(oldRequest.cancelled).toBeTrue();
    http.expectOne('resume-java.json').flush(resume);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Sample Engineer');
  });

  it('explains malformed data and recovers on a later aspect change', () => {
    spyOn(console, 'error');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne('resume.json').flush({ general: { name: 'Broken' }, experience: { label: 'Experience', companies: 'wrong' } });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('resume.experience.companies');
    expect(document.title).toBe('Résumé unavailable');
    params.next({ a: 'java' });
    http.expectOne('resume-java.json').flush(resume);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Sample Engineer');
  });

  it('explains a network failure', () => {
    spyOn(console, 'error');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne('resume.json').error(new ProgressEvent('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Check your connection');
  });

  it('renders legacy summary and technical skills when new fields are absent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne('resume.json').flush({
      general: { name: 'Legacy Engineer', objective: 'Legacy summary' },
      technicalSkills: { label: 'Technical Skills', details: [{ label: 'Backend', description: 'Legacy Java' }] },
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#summary-heading')?.nextElementSibling?.textContent).toBe('Legacy summary');
    expect(fixture.nativeElement.querySelector('app-resume-technical-skills')?.textContent).toContain('Legacy Java');
    expect(fixture.nativeElement.querySelector('app-resume-education')).toBeNull();
  });

  it('prefers the new summary and core skills without rendering duplicate legacy sections', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http
      .expectOne('resume.json')
      .flush({
        ...resume,
        general: { ...resume.general, objective: 'Old objective' },
        technicalSkills: { label: 'Old Skills', details: [{ label: 'Old', description: 'Old technology' }] },
      });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('app-resume-technical-skills').length).toBe(1);
    expect(element.textContent).toContain('Core Expertise');
    expect(element.textContent).not.toContain('Old objective');
    expect(element.textContent).not.toContain('Old technology');
  });

  it('omits disabled sections while retaining web-only sections in the DOM', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http
      .expectOne('resume.json')
      .flush({
        ...resume,
        coreSkills: { ...resume.coreSkills, disabled: true },
        experience: { ...resume.experience, disabled: true },
        skills: { label: 'Hidden Skills', values: ['Hidden'], disabled: true },
        project: { label: 'Hidden Projects', projects: [], disabled: true },
        education: { label: 'Hidden Education', schools: [], disabled: true },
        language: { label: 'Hidden Languages', languages: [], disabled: true },
        training: { label: 'Training', trainings: [{ name: 'Example Course', organizer: 'Academy' }], print: false },
        hobbies: { label: 'Interests', values: ['Reading'], print: false },
      });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(
      element.querySelector(
        'app-resume-technical-skills, app-resume-experience, app-resume-label-values:not(.no-print), app-resume-project, app-resume-education, app-resume-language'
      )
    ).toBeNull();
    expect(element.querySelector('app-resume-training.no-print')?.textContent).toContain('Example Course');
    expect(element.querySelector('app-resume-label-values.no-print')?.textContent).toContain('Reading');
  });

  it('preserves safe summary formatting and strips executable HTML', () => {
    spyOn(console, 'warn');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http
      .expectOne('resume.json')
      .flush({ general: resume.general, summary: '<strong>Summary</strong><img src="x" onerror="alert(1)"><script>alert(2)</script>' });
    fixture.detectChanges();
    const summary = fixture.nativeElement.querySelector('#summary-heading').nextElementSibling as HTMLElement;
    expect(summary.querySelector('strong')?.textContent).toBe('Summary');
    expect(summary.querySelector('[onerror], script')).toBeNull();
  });

  it('cancels an in-flight request when the component is destroyed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const request = http.expectOne('resume.json');
    fixture.destroy();
    expect(request.cancelled).toBeTrue();
  });

  it('prefers a over aspect, and returns to the default for empty selectors', () => {
    params.next({ a: 'java', aspect: 'sql' });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne('resume-java.json').flush(resume);
    params.next({ a: '', aspect: 'sql' });
    http.expectOne('resume-sql.json').flush(resume);
    params.next({ a: '', aspect: '' });
    http.expectOne('resume.json').flush(resume);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Sample Engineer');
  });
});
