import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { LocationHistory } from 'shared/models';

@Component({
  selector: 'app-location-history-dialog',
  templateUrl: './location-history-dialog.component.html',
  styleUrls: ['./location-history-dialog.component.scss']
})

export class LocationHistoryDialogComponent implements OnInit {
  name: string;
  locationHistory: LocationHistory[] = [];
  locationHistoryDataSource = new MatTableDataSource<LocationHistory>();
  displayedColumns: string[] = ['location', 'timestamp', 'status'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<LocationHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.locationHistory = data.locationHistory;
    this.name = data.name;
  }

  ngOnInit() {
    this.setupTable();
  }

  setupTable() {
      this.locationHistoryDataSource = new MatTableDataSource<LocationHistory>(this.locationHistory);
      this.locationHistoryDataSource.paginator = this.paginator;
      this.locationHistoryDataSource.sort = this.sort;
  }

  closeDialog() {
      this.dialogRef.close();
  }

  changedValuesArray(changesValues: string) {
      return changesValues.split('\\n');
  }
}
