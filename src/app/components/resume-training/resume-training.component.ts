import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Training } from '../../interfaces/training.interface';

@Component({
  selector: 'app-resume-training',
  templateUrl: './resume-training.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeTrainingComponent {
  readonly training = input.required<Training>();
}
