import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Resume } from './interfaces/resume.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly title = 'resume-app';

  resume$!: Observable<Resume>;

  ngOnInit(): void {
    document.title = this.title;

    this.resume$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        const postfix = params['p'];
        return this.getJsonData(postfix);
      })
    );
  }

  getJsonData(postfix: string): Observable<any> {
    const apiUrl = `resume${postfix ? '-' + postfix : ''}.json`;

    return this.http.get<any>(apiUrl);
  }
}
