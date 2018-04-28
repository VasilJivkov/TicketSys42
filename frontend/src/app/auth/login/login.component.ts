import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl, NgForm} from '@angular/forms'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AccessToken } from '../../models/users/AccessToken';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private username: AbstractControl;
  private password: AbstractControl;
  private credentialsError: string

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.username = this.loginForm.get('username');
    this.password = this.loginForm.get('password');
  }
  

  login(loginForm: NgForm): void{
    this.auth.login(loginForm.value).subscribe((res: AccessToken) => {
        localStorage.setItem('access_token', res.token);
        this.toastr.success(`Welcome, ${this.loginForm.get('username').value}!`);
    },
        (err: HttpErrorResponse) => {
            if (err.status === 302) {
                this.toastr.error(err.error.err);
            } else {
                this.toastr.error(err.name);
            }
        });
  }

  validate(input: AbstractControl): string{
    if (input.hasError('required')) {
        return 'The field is required';
    }
  }

}
