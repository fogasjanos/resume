import { Education } from './education.interface';
import { Experience } from './experience.interface';
import { General } from './general.interface';
import { LabelValues } from './label-values.interface';
import { Language } from './language.interface';
import { Project } from './project.interface';
import { Training } from './training.interface';
import { TechnicalSkill } from './technical-skill.interface';

export interface Resume {
  readonly error?: boolean;
  readonly general: General;
  readonly experience?: Experience;
  readonly technicalSkills?: TechnicalSkill;
  readonly project?: Project;
  readonly education: Education;
  readonly training?: Training;
  readonly language?: Language;
  readonly skills?: LabelValues;
  readonly hobbies?: LabelValues;
}
