import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { EditComponent } from './components';
import { InmateResolver } from './inmate.resolver';

// Guard
import { CanDeactivateGuard } from 'core/guards';

export const routes = [
  { path: '', component: EditComponent },
  { path: 'new', component: EditComponent, canDeactivate: [CanDeactivateGuard], },
  { path: ':id', component: EditComponent, resolve: { inmate: InmateResolver }, canDeactivate: [CanDeactivateGuard], },
  { path: '*', component: EditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmateRoutingModule {}
