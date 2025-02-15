import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideHttpClient(), provideRouter([])],
};
