import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { Inmate } from 'shared/models';
import { InmateService, DialogService } from 'shared/services';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;

  inmate: Inmate;
  age: string;

  editMode = false;
  saved = false;

  cellNumberMin = 1;
  cellNumberMax = 2000;
  dobMin: moment.Moment;
  dobMax: moment.Moment;
  intakeMin: moment.Moment;
  intakeMax: moment.Moment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private inmateService: InmateService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.setDateValidationValues();

    this.route.data.forEach((data: Data) => {
      this.inmate = data.inmate as Inmate;
    });

    if (!this.inmate) {
      // resolver hasn't laoded an inmate - must be a new entry.
      this.inmate = {
        id: undefined,
        firstNames: '',
        lastName: '',
        dob: null,
        cellNumber: null,
        intakeDate: null,
        isActive: true,
        locationHistory: []
      };
    }

    this.createForm(this.inmate);
  }

  private setDateValidationValues() {
    // Date of birth
    this.dobMin = moment().subtract(100, 'years');
    this.dobMax = moment().subtract(18, 'years');

    // intake times
    this.intakeMin = moment().subtract(10, 'years');
    this.intakeMax = moment();
  }

  private createForm(inmate: Inmate) {
    this.form = new FormGroup({
      firstNames: new FormControl(inmate.firstNames, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9].*'),
        Validators.maxLength(250)
      ]),
      lastName: new FormControl(inmate.lastName, [Validators.required,
      Validators.pattern('[a-zA-Z0-9].*'),
      Validators.maxLength(250)
      ]),
      dob: new FormControl(inmate.dob, [Validators.required]),
      cellNumber: new FormControl(inmate.cellNumber, [
        Validators.required,
        Validators.min(this.cellNumberMin),
        Validators.max(this.cellNumberMax)
      ]),
      intakeDate: new FormControl(inmate.intakeDate),
      isActive: new FormControl(inmate.isActive)
    });
  }

  formatAge(event: MatDatepickerInputEvent<Date>) {
    const now = new Date();
    const dob = new Date(event.value);

    this.age = ((now.getTime() - dob.getTime()) / 31536000000).toFixed(0);
  }

  saveChanges(formValues) {
    if (this.form.invalid) {
      return;
    }

    this.inmate.firstNames = formValues.firstNames;
    this.inmate.lastName = formValues.lastName;
    this.inmate.dob = moment(formValues.dob);
    this.inmate.cellNumber = formValues.cellNumber;
    this.inmate.intakeDate = moment(formValues.intake);
    this.inmate.isActive = formValues.isActive;

    this.save(this.inmate);
  }

  public getErrorMessage(controlName: string) {
    const control = this.form.controls[controlName];
    if (control) {
      return control.hasError('required') ? 'Required' :
        control.hasError('pattern') ? 'Invalid' :
        control.hasError('maxLength') ? `Exceed input length`:
        control.hasError('min') ? `Minimum ${this.cellNumberMin}` :
        control.hasError('max') ? `Maximum ${this.cellNumberMax}` : '';
    }
    return 'error';
  }


  private save(inmate: Inmate) {
    this.inmateService.save(inmate).subscribe(
      _=> {
        this.snackBar.open('Saved successfully', '', {
          duration: 2000,
        });

        this.saved = true;
        // saved so navigate away from record.
        this.router.navigate(['../home', { relativeTo: this.route }]);
      },
      error => {
        console.log(error);

        this.snackBar.open(
          'A problem has occured whilst saving this record. Please contact your system admin.',
          '',
          { duration: 2000});
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    let allowBreak = true;

    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control.dirty) {
        allowBreak = false;
      }
    });

    if (allowBreak) {
      // form is untouched - allow navigation away
      return true;
    }

    if (this.saved) {
      // form has been saved so allow navigation.
      return true;
    }

    // form has been touched and not saved... confirm navigation
    return this.dialogService.confirm('Discard changes?');
  }
}
