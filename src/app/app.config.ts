import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';

import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideHttpClient(withXhr()), provideRouter([])],
};
