import { Education } from './education.interface';
import { Experience } from './experience.interface';
import { General } from './general.interface';
import { Language } from './language.interface';
import { Project } from './project.interface';
import { Skill } from './skill.interface';
import { Training } from './training.interface';

export interface Resume {
  readonly education: Education;
  readonly experience?: Experience;
  readonly general: General;
  readonly language?: Language;
  readonly project?: Project;
  readonly skills: Skill;
  readonly training?: Training;
}
