import { ResumeIconComponent } from '../resume-icon/resume-icon.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Language } from '../../interfaces/language.interface';

@Component({
  imports: [ResumeIconComponent],
  selector: 'app-resume-language',
  templateUrl: './resume-language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeLanguageComponent {
  readonly language = input.required<Language>();
}
