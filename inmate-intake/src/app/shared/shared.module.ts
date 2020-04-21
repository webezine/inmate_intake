import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmateService } from './services';
import { DialogService } from './services';
import { NgMaterialModule } from './ng-material.module'

import { LocationHistoryDialogComponent } from './components/location-history-dialog/location-history-dialog.component';

@NgModule({
  imports: [CommonModule,  NgMaterialModule ],
  providers: [InmateService, DialogService ],
  declarations: [ LocationHistoryDialogComponent],
  entryComponents: [ LocationHistoryDialogComponent ]
})

export class SharedModule { }
