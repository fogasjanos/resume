import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, of, map, distinctUntilChanged, startWith, switchMap, catchError, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ResumeState, resumeErrorMessage } from './interfaces/resume-state';
import { ResumeHeaderComponent } from './components/resume-header/resume-header.component';
import { ResumeExperienceComponent } from './components/resume-experience/resume-experience.component';
import { ResumeProjectComponent } from './components/resume-project/resume-project.component';
import { ResumeTrainingComponent } from './components/resume-training/resume-training.component';
import { ResumeEducationComponent } from './components/resume-education/resume-education.component';
import { ResumeLanguageComponent } from './components/resume-language/resume-language.component';
import { ResumeLabelValuesComponent } from './components/resume-label-values/resume-label-values.component';
import { JsonDataService } from './services/json-data.service';
import { ResumeTechnicalSkillsComponent } from './components/resume-technical-skills/resume-technical-skills.component';

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    ResumeEducationComponent,
    ResumeExperienceComponent,
    ResumeHeaderComponent,
    ResumeLabelValuesComponent,
    ResumeLanguageComponent,
    ResumeProjectComponent,
    ResumeTrainingComponent,
    ResumeTechnicalSkillsComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly jsonDataService = inject(JsonDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);

  readonly state$: Observable<ResumeState> = this.route.queryParamMap.pipe(
    map((params) => params.get('a') || params.get('aspect') || undefined),
    distinctUntilChanged(),
    switchMap((aspect) =>
      this.jsonDataService.getJsonData(aspect).pipe(
        map((resume): ResumeState => ({ status: 'ready', resume })),
        catchError((error: unknown) => {
          console.error('Error loading résumé:', error);
          return of<ResumeState>({ status: 'error', message: resumeErrorMessage(error) });
        }),
        startWith<ResumeState>({ status: 'loading' })
      )
    ),
    tap((state) =>
      this.title.setTitle(
        state.status === 'ready'
          ? `${state.resume.general.name} - Résumé`
          : state.status === 'loading'
            ? 'Loading résumé…'
            : 'Résumé unavailable'
      )
    )
  );
}
