import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private readonly http = inject(HttpClient);

  getJsonData(aspect: string): Observable<any> {
    const postfix = aspect ? '-' + aspect : '';
    const apiUrl = `resume${postfix}.json`;

    return this.http.get<any>(apiUrl);
  }
}
