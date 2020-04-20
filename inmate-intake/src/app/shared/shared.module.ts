import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmateService } from './services';
import { DialogService } from './services';


@NgModule({
  imports: [CommonModule],
  providers: [InmateService, DialogService],
})

export class SharedModule { }
