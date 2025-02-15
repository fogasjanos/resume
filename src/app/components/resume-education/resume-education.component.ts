import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education } from '../../interfaces/education.interface';

@Component({
  selector: 'app-resume-education',
  standalone: true,
  templateUrl: './resume-education.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeEducationComponent {
  readonly education = input.required<Education>();
}
