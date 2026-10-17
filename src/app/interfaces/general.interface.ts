import { LabelValue } from './label-value.interface';
import { City } from './city.interface';

export interface General {
  readonly cell?: LabelValue;
  readonly email?: LabelValue;
  readonly github?: LabelValue;
  readonly linkedIn?: LabelValue;
  readonly city?: City;
  readonly name: string;
  readonly headline?: string;
  readonly website?: LabelValue;
  readonly objective?: string;
}
