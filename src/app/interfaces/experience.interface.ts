import { Company } from './company.interface';
import { Styleable } from './styleable.interface';

export interface Experience extends Styleable {
  readonly companies: readonly Company[];
  readonly label: string;
}
