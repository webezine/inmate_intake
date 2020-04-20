import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseService } from './base.service';
import { Inmate } from 'shared/models';
import { EnvironmentService } from 'core/services';

@Injectable()
export class InmateService extends BaseService {
  private inmatesUrl = `${this.environmentService.apiUrl}/inmates`;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    super();
  }

  getAll(): Observable<Inmate[]> {
    return this.http.get<Inmate[]>(this.inmatesUrl);
  }

  get(id: string): Observable<Inmate> {
    const url = `${this.inmatesUrl}/${id}`;

    return this.http
      .get<Inmate>(url)
      .pipe( tap(_ => super.log('Inmate Service > get', `fetched Inmate with the id=${id}`)) );
  }

  save(inmate: Inmate): Observable<Inmate> {
    if (!inmate.id) {
      return this.add(inmate);
    }

    return this.update(inmate);
  }

  /** POST: add a new inmate */
  private add(inmate: Inmate): Observable<Inmate> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Inmate>(this.inmatesUrl, inmate, httpOptions);
  }

  /** PUT: update an existing inmate */
  private update(inmate: Inmate): Observable<Inmate> {
    const id = typeof inmate === 'number' ? inmate : inmate.id;
    const url = `${this.inmatesUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Inmate>(url, inmate, httpOptions);
  }
}
