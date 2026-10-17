import { HttpErrorResponse } from '@angular/common/http';
import { Resume } from './resume.interface';
import { ResumeValidationError } from '../services/resume-validation';

export type ResumeState =
  | { readonly status: 'loading' }
  | { readonly status: 'ready'; readonly resume: Resume }
  | { readonly status: 'error'; readonly message: string };

export function resumeErrorMessage(error: unknown): string {
  if (error instanceof ResumeValidationError) return `Invalid résumé data: ${error.message}`;
  if (error instanceof HttpErrorResponse) {
    if (error.status === 404) return 'The requested résumé could not be found. Check the aspect in the URL.';
    if (error.status === 0) return 'Unable to connect. Check your connection and try again.';
    if (error.status >= 200 && error.status < 300) return 'The résumé file is not valid JSON.';
  }
  return 'Unable to load the résumé. Please try again later.';
}
