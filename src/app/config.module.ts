import { ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BAD_WORDS } from './shared';

@NgModule()
export class ConfigModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: BAD_WORDS,
          useValue: environment.badWords,
        },
      ],
    };
  }
}
