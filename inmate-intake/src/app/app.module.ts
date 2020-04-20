import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from 'core/core.module';
import { NgMaterialModule }  from './shared/ng-material.module';
import { SharedModule } from 'shared/shared.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './inmate/edit/edit.component';
import { LocationHistoryComponent } from './inmate/location-history/location-history.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditComponent,
    LocationHistoryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    NgMaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
