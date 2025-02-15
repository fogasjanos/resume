import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private readonly http = inject(HttpClient);

  getJsonData(postfix: string): Observable<any> {
    const apiUrl = `resume${postfix ? '-' + postfix : ''}.json`;

    return this.http.get<any>(apiUrl);
  }
}
