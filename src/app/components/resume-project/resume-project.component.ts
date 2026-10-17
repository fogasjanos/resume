import { ResumeIconComponent } from '../resume-icon/resume-icon.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';

@Component({
  imports: [ResumeIconComponent],
  selector: 'app-resume-project',
  templateUrl: './resume-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeProjectComponent {
  readonly project = input.required<Project>();
}
