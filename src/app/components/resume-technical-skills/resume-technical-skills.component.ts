import { ResumeIconComponent } from '../resume-icon/resume-icon.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechnicalSkill } from '../../interfaces/technical-skill.interface';

@Component({
  imports: [ResumeIconComponent],
  selector: 'app-resume-technical-skills',
  templateUrl: './resume-technical-skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeTechnicalSkillsComponent {
  readonly technicalSkill = input.required<TechnicalSkill>();
}
