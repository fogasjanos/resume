import { ProjectDetail } from './project-detail.interface';
import { Styleable } from './styleable.interface';

export interface Project extends Styleable {
  readonly label: string;
  readonly projects: ProjectDetail[];
}
