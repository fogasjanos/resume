import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '../../interfaces/experience.interface';

@Component({
  selector: 'app-resume-experience',
  standalone: true,
  templateUrl: './resume-experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeExperienceComponent {
  readonly experience = input.required<Experience>();
}
