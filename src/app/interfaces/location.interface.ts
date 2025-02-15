import { LabelValue } from './label-value.interface';

export interface Location extends LabelValue {
  readonly url: string;
}
