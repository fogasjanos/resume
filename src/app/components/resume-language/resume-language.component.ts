import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Language } from '../../interfaces/language.interface';

@Component({
  selector: 'app-resume-language',
  templateUrl: './resume-language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeLanguageComponent {
  readonly language = input.required<Language>();
}
