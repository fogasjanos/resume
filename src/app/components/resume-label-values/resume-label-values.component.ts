import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LabelValues } from '../../interfaces/label-values.interface';

@Component({
  selector: 'app-resume-label-values',
  templateUrl: './resume-label-values.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeLabelValuesComponent {
  readonly labelValues = input.required<LabelValues>();
}
