import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth.service';
import { IAccessToken } from '../../models/users/AccessToken';
import { IDecodedToken } from '../../models/users/DecodedToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private username: AbstractControl;
  private password: AbstractControl;
  private credentialsError: string = null;

  private user: IDecodedToken;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  public ngOnInit(): void {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.username = this.loginForm.get('username');
    this.password = this.loginForm.get('password');
  }

  private login(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.auth.login(loginForm.value).subscribe(
      (res: IAccessToken) => {
        localStorage.setItem('access_token', res.token);
        this.credentialsError = null;
        this.auth.getUser();
        this.toastr.success(`Welcome, ${this.loginForm.get('username').value}!`);
        this.router.navigate(['/', this.user.company]);
      },
      (err: HttpErrorResponse) => {
        this.credentialsError = err.error.err;
        this.auth.getUser();
      });
    }
  }

  private validate(inputField: AbstractControl): string {
    if (inputField.hasError('required')) {
        return 'The field is required';
    }
  }

}
