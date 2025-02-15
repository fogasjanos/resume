import { LanguageDetail } from './language-detail.interface';
import { Styleable } from './styleable.interface';

export interface Language extends Styleable {
  readonly label: string;
  readonly languages: LanguageDetail[];
}
