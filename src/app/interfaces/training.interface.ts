import { Styleable } from './styleable.interface';
import { TrainingDetail } from './training-detail.interface';

export interface Training extends Styleable {
  readonly label: string;
  readonly trainings: readonly TrainingDetail[];
}
