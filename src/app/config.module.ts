import { ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BAD_WORDS, DIVISION_ORDER } from './shared';

@NgModule()
export class ConfigModule {
  static forRoot(): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: BAD_WORDS,
          useValue: environment.badWords,
        },
        {
          provide: DIVISION_ORDER,
          useValue: environment.divisionOrder,
        },
      ],
    };
  }
}
