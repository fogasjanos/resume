import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Resume } from './interfaces/resume.interface';
import { ResumeHeaderComponent } from './components/resume-header/resume-header.component';
import { ResumeExperienceComponent } from './components/resume-experience/resume-experience.component';
import { ResumeProjectComponent } from './components/resume-project/resume-project.component';
import { ResumeTrainingComponent } from './components/resume-training/resume-training.component';
import { ResumeEducationComponent } from './components/resume-education/resume-education.component';
import { ResumeLanguageComponent } from './components/resume-language/resume-language.component';
import { ResumeLabelValuesComponent } from './components/resume-label-values/resume-label-values.component';
import { JsonDataService } from './services/json-data.service';

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
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly jsonDataService = inject(JsonDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly title = 'resume-app';

  resume$!: Observable<Resume>;

  constructor() {
    document.title = this.title;

    this.resume$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        const aspect = params['a'] || params['aspect'];
        return this.jsonDataService.getJsonData(aspect);
      })
    );
  }
}
