import { Hobby } from './hobby.interface';
import { LabelValue } from './label-value.interface';
import { City } from './city.interface';

export interface General {
  readonly cell?: LabelValue;
  readonly email?: LabelValue;
  readonly github?: LabelValue;
  readonly linkedIn?: LabelValue;
  readonly city?: City;
  readonly hobbies?: Hobby;
  readonly name: string;
  readonly objective?: string;
}
