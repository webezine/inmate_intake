import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EnvironmentService, AuthService } from './services';
import { NgMaterialModule } from 'shared/ng-material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [NavBarComponent, LoginComponent],
  imports: [CommonModule, RouterModule, NgMaterialModule, ReactiveFormsModule],
  providers: [EnvironmentService, AuthService],
  exports: [NavBarComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'The Core Module (core> core.module.ts) has already been loaded.'
      );
    }
  }
}
