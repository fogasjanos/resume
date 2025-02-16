import { Education } from './education.interface';
import { Experience } from './experience.interface';
import { General } from './general.interface';
import { LabelValues } from './label-values.interface';
import { Language } from './language.interface';
import { Project } from './project.interface';
import { Training } from './training.interface';

export interface Resume {
  readonly error?: boolean;
  readonly general: General;
  readonly experience?: Experience;
  readonly project?: Project;
  readonly skills?: LabelValues;
  readonly training?: Training;
  readonly education: Education;
  readonly language?: Language;
  readonly hobbies?: LabelValues;
}
