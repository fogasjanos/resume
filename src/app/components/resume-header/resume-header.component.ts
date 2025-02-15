import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { General } from '../../interfaces/general.interface';

@Component({
  selector: 'app-resume-header',
  standalone: true,
  templateUrl: './resume-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeHeaderComponent {
  readonly general = input.required<General>();
}
