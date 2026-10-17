import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JsonDataService } from './json-data.service';

describe('JsonDataService', () => {
  let service: JsonDataService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(JsonDataService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  for (const [aspect, url] of [
    [undefined, 'resume.json'],
    ['java', 'resume-java.json'],
  ] as const) {
    it(`loads ${url}`, () => {
      service.getJsonData(aspect).subscribe((data) => expect(data.general.name).toBe('Sample Engineer'));
      http.expectOne(url).flush({ general: { name: 'Sample Engineer' } });
    });
  }
  it('rejects invalid nested data before rendering', () => {
    service.getJsonData().subscribe({
      next: () => fail('Expected validation failure'),
      error: (error) => expect(error.message).toContain('resume.general.name'),
    });
    http.expectOne('resume.json').flush({ general: { name: 123 } });
  });

  it('encodes an aspect as a single filename suffix', () => {
    service.getJsonData('java/sql?preview=true#test').subscribe();
    http.expectOne('resume-java%2Fsql%3Fpreview%3Dtrue%23test.json').flush({ general: { name: 'Sample' } });
  });
});
