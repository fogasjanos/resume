import { Styleable } from './styleable.interface';

export interface LabelValues extends Styleable {
  readonly label: string;
  readonly values: readonly string[];
  readonly className?: string;
}
