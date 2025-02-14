import { School } from './school.interface';
import { Styleable } from './styleable.interface';

export interface Education extends Styleable {
  readonly label: string;
  readonly schools: School[];
}
