import { parseResume, ResumeValidationError } from './resume-validation';
import { resumeErrorMessage } from '../interfaces/resume-state';
import { HttpErrorResponse } from '@angular/common/http';

describe('Résumé validation', () => {
  it('accepts optional education fields, legacy data and unknown archive fields without modification', () => {
    const data = {
      general: { name: 'Sample Engineer', objective: '<b>Legacy summary</b>' },
      education: { label: 'Education', schools: [{ degree: 'BSc', school: 'University', year: 2008 }] },
      experience: {
        label: 'Experience',
        companies: [{ name: 'Example', from: 2020, to: 'Present', description: ['Legacy bullet'] }, { description: ['Continuation'] }],
      },
      technicalSkills: { label: 'Skills', details: [{ label: 'Backend', description: 'Java' }] },
      archive: { notes: ['Keep this'] },
    };
    expect(parseResume(data)).toBe(data);
    expect(parseResume({ general: { name: 'Minimal CV' } }).general.name).toBe('Minimal CV');
  });

  for (const [section, field, invalid] of [
    ['experience', 'companies', [{ highlights: [42] }]],
    ['coreSkills', 'details', [{ label: 'Backend', description: null }]],
    ['technicalSkills', 'details', 'wrong'],
    ['education', 'schools', [{ degree: 'BSc', school: 'University', year: '2008' }]],
    ['language', 'languages', [{ name: 'English', level: 3 }]],
    ['training', 'trainings', [{ name: 'Course' }]],
    ['project', 'projects', [{ name: 'Project', description: [] }]],
    ['skills', 'values', [null]],
    ['hobbies', 'values', {}],
  ] as const) {
    it(`rejects invalid ${section}.${field}`, () => {
      expect(() => parseResume({ general: { name: 'Sample' }, [section]: { label: section, [field]: invalid } })).toThrowError(
        ResumeValidationError,
        new RegExp(`resume\\.${section}\\.${field}`)
      );
    });
  }
  for (const value of [
    null,
    [],
    {},
    { general: null },
    { general: { name: '  ' } },
    { general: { name: 'Sample', email: { value: 'a@b.c' } } },
    { general: { name: 'Sample' }, skills: { label: 'Skills', values: [], disabled: 'false' } },
  ]) {
    it(`rejects an invalid root or field: ${JSON.stringify(value)}`, () => {
      expect(() => parseResume(value)).toThrowError(ResumeValidationError);
    });
  }
  it('distinguishes JSON syntax errors from generic server failures', () => {
    expect(resumeErrorMessage(new HttpErrorResponse({ status: 200, error: new SyntaxError('Bad JSON') }))).toContain('not valid JSON');
    expect(resumeErrorMessage(new HttpErrorResponse({ status: 500 }))).toContain('Please try again');
  });
});
