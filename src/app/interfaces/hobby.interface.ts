import { Styleable } from './styleable.interface';

export interface Hobby extends Styleable {
  readonly label: string;
  readonly values: string[];
}
