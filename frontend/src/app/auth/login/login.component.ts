import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,AbstractControl, NgForm} from '@angular/forms'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AccessToken } from '../../models/users/AccessToken';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private username: AbstractControl;
  private password: AbstractControl;
  private credentialsError: string = null;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.username = this.loginForm.get('username');
    this.password = this.loginForm.get('password');
  }
  

  login(loginForm: NgForm): void{
    if (loginForm.valid) {
        this.auth.login(loginForm.value).subscribe((
          res: AccessToken) => {
            localStorage.setItem('access_token', res.token);
            this.credentialsError = null;
            this.auth.getUser();
            this.toastr.success(`Welcome, ${this.loginForm.get('username').value}!`);
            this.router.navigate(['/home'])
        },
            (err: HttpErrorResponse) => {
              this.credentialsError = err.error.err;
              this.auth.getUser();
          }, () => {
            console.log('completed')}); 
            
    }
  }

  validate(inputField: AbstractControl): string{
    if (inputField.hasError('required')) {
        return 'The field is required';
    }
  }

}
