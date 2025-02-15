import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Hobby } from '../../interfaces/hobby.interface';

@Component({
  selector: 'app-resume-hobbies',
  templateUrl: './resume-hobbies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeHobbiesComponent {
  readonly hobbies = input.required<Hobby>();
}
