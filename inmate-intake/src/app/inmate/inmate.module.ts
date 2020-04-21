import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

// Modules
import { NgMaterialModule } from 'shared/ng-material.module';
import { SharedModule } from 'shared/shared.module';
import { InmateRoutingModule } from './inmate-routing.module';

// Resolver
import { InmateResolver } from './inmate.resolver';

// Components
import { EditComponent } from './components';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    SharedModule,
    InmateRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule
  ],
  providers: [InmateResolver]
})
export class InmateModule { }
