import { ResumeIconComponent } from '../resume-icon/resume-icon.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Experience } from '../../interfaces/experience.interface';

@Component({
  imports: [ResumeIconComponent],
  selector: 'app-resume-experience',
  templateUrl: './resume-experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeExperienceComponent {
  readonly experience = input.required<Experience>();
}
