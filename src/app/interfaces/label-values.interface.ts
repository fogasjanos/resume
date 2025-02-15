import { Styleable } from './styleable.interface';

export interface LabelValues extends Styleable {
  readonly label: string;
  readonly values: string[];
  readonly disabled?: boolean; 
}
