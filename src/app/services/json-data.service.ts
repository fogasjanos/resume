import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Resume } from '../interfaces/resume.interface';
import { parseResume } from './resume-validation';

@Injectable({ providedIn: 'root' })
export class JsonDataService {
  private readonly http = inject(HttpClient);

  getJsonData(aspect?: string): Observable<Resume> {
    const postfix = aspect ? '-' + encodeURIComponent(aspect) : '';
    return this.http.get<unknown>(`resume${postfix}.json`).pipe(map(parseResume));
  }
}
