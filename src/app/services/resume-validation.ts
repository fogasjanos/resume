import { Resume } from '../interfaces/resume.interface';

export class ResumeValidationError extends Error {
  constructor(
    readonly path: string,
    expected: string
  ) {
    super(`${path}: expected ${expected}.`);
    this.name = 'ResumeValidationError';
  }
}

type Rule = (value: unknown, path: string) => void;
type Field = { readonly rule: Rule; readonly required?: boolean };

const text: Rule = (value, path) => {
  if (typeof value !== 'string') throw new ResumeValidationError(path, 'a string');
};
const name: Rule = (value, path) => {
  text(value, path);
  if (!(value as string).trim()) throw new ResumeValidationError(path, 'a non-empty string');
};
const boolean: Rule = (value, path) => {
  if (typeof value !== 'boolean') throw new ResumeValidationError(path, 'a boolean');
};
const date: Rule = (value, path) => {
  if (typeof value !== 'string' && (typeof value !== 'number' || !Number.isFinite(value))) {
    throw new ResumeValidationError(path, 'a year or display string');
  }
};
const year: Rule = (value, path) => {
  if (typeof value !== 'number' || !Number.isInteger(value)) throw new ResumeValidationError(path, 'an integer year');
};
const optional = (rule: Rule): Field => ({ rule });
const required = (rule: Rule): Field => ({ rule, required: true });
const object =
  (fields: Record<string, Field>): Rule =>
  (value, path) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new ResumeValidationError(path, 'an object');
    }
    const record = value as Record<string, unknown>;
    for (const [key, field] of Object.entries(fields)) {
      if (record[key] !== undefined || field.required) field.rule(record[key], `${path}.${key}`);
    }
  };
const array =
  (rule: Rule): Rule =>
  (value, path) => {
    if (!Array.isArray(value)) throw new ResumeValidationError(path, 'an array');
    value.forEach((entry, index) => rule(entry, `${path}[${index}]`));
  };
const contact = object({ label: required(text), value: required(text) });
const style = { disabled: optional(boolean), print: optional(boolean), style: optional(text), labelClass: optional(text) };
const section = (fields: Record<string, Field>): Field => optional(object({ ...style, label: required(text), ...fields }));
const expertise = section({ details: required(array(object({ label: required(text), description: required(text) }))) });

const resume = object({
  general: required(
    object({
      name: required(name),
      headline: optional(text),
      objective: optional(text),
      cell: optional(contact),
      email: optional(contact),
      github: optional(contact),
      linkedIn: optional(contact),
      website: optional(contact),
      city: optional(object({ label: required(text), value: required(text), url: required(text) })),
    })
  ),
  summary: optional(text),
  coreSkills: expertise,
  technicalSkills: expertise,
  experience: section({
    companies: required(
      array(
        object({
          name: optional(text),
          position: optional(text),
          from: optional(date),
          to: optional(date),
          summary: optional(text),
          location: optional(text),
          url: optional(text),
          technologies: optional(text),
          description: optional(array(text)),
          highlights: optional(array(text)),
        })
      )
    ),
  }),
  education: section({
    schools: required(
      array(
        object({
          degree: required(text),
          school: required(text),
          faculty: optional(text),
          year: required(year),
        })
      )
    ),
  }),
  language: section({ languages: required(array(object({ name: required(text), level: required(text) }))) }),
  skills: section({ values: required(array(text)), className: optional(text) }),
  hobbies: section({ values: required(array(text)), className: optional(text) }),
  project: section({ projects: required(array(object({ name: required(text), description: required(text) }))) }),
  training: section({ trainings: required(array(object({ name: required(text), organizer: required(text) }))) }),
});

/** Validate rendered fields, retaining unknown archive/extension fields unchanged. */
export function parseResume(value: unknown): Resume {
  resume(value, 'resume');
  return value as Resume;
}
