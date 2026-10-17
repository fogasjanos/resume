import { ResumeIconComponent } from '../resume-icon/resume-icon.component';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { General } from '../../interfaces/general.interface';

@Component({
  imports: [ResumeIconComponent],
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeHeaderComponent {
  readonly general = input.required<General>();
}
