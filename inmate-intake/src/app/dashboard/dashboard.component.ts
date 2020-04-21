import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Inmate, LocationHistory } from 'shared/models';
import { InmateService } from 'shared/services';
import { LocationHistoryDialogComponent } from 'shared/components/location-history-dialog/location-history-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  loading = false;
  inmates: Inmate[] = [];
  private ngUnsubscribe = new Subject();
  private includeInactiveRecords = true;
  private filterValue = '';

  displayedColumns: string[] = ['name', 'age', 'intakeDate', 'cellNumber', 'status', 'locations'];
  dataSource: MatTableDataSource<Inmate>;
  expandedInmate: Inmate | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  get includeInactive(): boolean {
    return this.includeInactiveRecords;
  }
  set includeInactive(value: boolean) {
    this.includeInactiveRecords = value;
    this.filterRecords(this.listFilter, this.includeInactiveRecords);
  }

  get listFilter(): string {
    return this.filterValue;
  }
  set listFilter(value: string) {
    this.filterValue = value;
    this.filterRecords(this.listFilter, this.includeInactive);
  }

  constructor(
    private dialog: MatDialog,
    private inmateService: InmateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadInmateRecords();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private bindTable(inmates: Inmate[]): void {
    this.dataSource = new MatTableDataSource(inmates);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator.firstPage();
  }

  private filterRecords(searchVal: string, includeInactive: boolean): void {
    searchVal = searchVal.toLocaleLowerCase();

    const filtered = this.inmates.filter((item: Inmate) => {
      return (item.firstNames.toLocaleLowerCase().indexOf(searchVal) !== -1 ||
        item.lastName.toLocaleLowerCase().indexOf(searchVal) !== -1 ||
        item.cellNumber.toString().indexOf(searchVal) !== -1)
        && (includeInactive ? item.isActive : true);
    });

    this.bindTable(filtered);
  }

  private loadInmateRecords(): void {
    this.loading = true;
    this.inmateService.getAll().pipe(
      finalize(() => {
        this.loading = false;
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: results => {
        this.inmates = results;
        this.filterRecords(this.filterValue, this.includeInactive);
      },
      error: error => {
        console.log(error);
        this.snackBar.open('Unable to load any inmate records.', '', {
          duration: 2000
        });
      }
    });
  }

  public getActiveLocationHistory(inmate: Inmate): LocationHistory[] {
    return inmate.locationHistory.filter(lh => lh.isActive);
  }

  public openLocationHistoryDialog(inmate: Inmate): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = { locationHistory: inmate.locationHistory, name: `${inmate.firstNames}  ${inmate.lastName}`};
    dialogConfig.width = '950px';
    dialogConfig.autoFocus = false;

    this.dialog.open(LocationHistoryDialogComponent, dialogConfig);
  }

}
