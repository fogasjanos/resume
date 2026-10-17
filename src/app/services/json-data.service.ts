import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from '../interfaces/resume.interface';

@Injectable({ providedIn: 'root' })
export class JsonDataService {
  private readonly http = inject(HttpClient);

  getJsonData(aspect?: string): Observable<Resume> {
    const postfix = aspect ? '-' + encodeURIComponent(aspect) : '';
    return this.http.get<Resume>(`resume${postfix}.json`);
  }
}
