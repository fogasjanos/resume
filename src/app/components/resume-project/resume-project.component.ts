import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-resume-project',
  standalone: true,
  templateUrl: './resume-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeProjectComponent {
  readonly project = input.required<Project>();
}
