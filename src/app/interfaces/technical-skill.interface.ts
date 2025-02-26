import { TechnicalSkillDetail } from './technical-skill-detail.interface';
import { Styleable } from './styleable.interface';

export interface TechnicalSkill extends Styleable {
  readonly label: string;
  readonly details: readonly TechnicalSkillDetail[];
}
