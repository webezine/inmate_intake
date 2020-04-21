import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { InmateService } from 'shared/services';

@Injectable()
export class InmateResolver implements Resolve<any>, OnDestroy {
  constructor(private inmateService: InmateService, private router: Router) { }
  componentDestroyed$: Subject<boolean> = new Subject();

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.inmateService.get(route.params.id).pipe(
      takeUntil(this.componentDestroyed$),
      map(inmate => {
        if (inmate) {
          return inmate;
        } else {
          this.router.navigate(['/404']);
        }
      })
    );
  }
}
