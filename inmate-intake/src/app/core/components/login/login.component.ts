import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services';
import { LoginCredential } from '../../../shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  returnUrl: string;
  loginError = false;
  form: FormGroup;
  loginCredential: LoginCredential = {
    username: '',
    password: '',
  };
  routeSubscription: Subscription;
  loginSubscription: Subscription;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      // user is logged in - so remove token from storage
      this.authService.logout();
    }

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      // check for a redirect back to original page.
      this.returnUrl = params.returnUrl || '/home';
    });

    this.createFormControls();
  }

  private createFormControls(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  submitForm(formValues) {
    this.loginError = false;

    if (!this.form.valid) {
      return;
    }

    this.loginCredential.username = formValues.username;
    this.loginCredential.password = formValues.password;

    this.login();
  }


  private login() {
    this.loginSubscription = this.authService.login(this.loginCredential).subscribe(
      {
        next: _=> {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: error => {
          this.loginError = true;
          throw error;
        }
      }
    );
  }

  getErrorMessage(controlName: string) {
    const control = this.form.controls[controlName];
    if(control) {
      return control.hasError('required') ? 'Required' :
      control.hasError('maxlength') ? 'Max Length 100 characters' : '';
    }

    return 'Error'
  }

}
