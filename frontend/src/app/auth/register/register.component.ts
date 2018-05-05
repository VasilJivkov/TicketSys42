import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AccessToken } from '../../models/users/AccessToken';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyTitles } from '../../models/responses/company-titles';
import { CompanyService } from '../../core/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private username: AbstractControl;
  private password: AbstractControl;
  private rePassword: AbstractControl;
  private email: AbstractControl;
  private nickname: AbstractControl;
  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private registerError: string = null;

  private newCompany: boolean = false;
  private company: AbstractControl;

  private companies: string[]

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe((res: CompanyTitles) => this.companies = res.companies);

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      firstName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      company: ['', [Validators.required]],
    }, {validator: this.PasswordMatch});

    // this.company = this.formBuilder.control('', [Validators.required]); // „-- dynamically adding/removing the input

    this.username = this.registerForm.get('username');
    this.password = this.registerForm.get('password');
    this.rePassword = this.registerForm.get('rePassword');
    this.email = this.registerForm.get('email');
    this.nickname = this.registerForm.get('nickname');
    this.firstName = this.registerForm.get('firstName');
    this.lastName = this.registerForm.get('lastName');
    this.company = this.registerForm.get('company');
    
  }

  register(registerForm: NgForm): void {
      if (registerForm.valid) {
          const newUser = registerForm.value;
          delete newUser.rePassword;
          this.auth.register(registerForm.value, this.newCompany).subscribe((res: AccessToken) => {
              localStorage.setItem('access_token', res.token);
              this.registerError = null;
              this.auth.getUser();
              this.toastr.success(`Welcome, ${this.registerForm.get('username').value}!`);
              this.router.navigate(['/home']);
          },
              (err: HttpErrorResponse) => {
                this.auth.getUser();
                  this.registerError = err.error.err;
              });
      }
  }

  private validate(inputField: AbstractControl): string {
    if (inputField.hasError('required')) {
      return 'The field is required';
    } else if (inputField.hasError('email')) {
      return 'Please enter a valid e-mail.';
    } else if (inputField.errors) {
      if (inputField.errors.minlength) {
        const requiredLength = inputField.errors.minlength.requiredLength;
        return `This field must have at least ${requiredLength} characters.`;
      } else if (inputField.errors.maxlength) {
        const requiredLength = inputField.errors.maxlength.requiredLength;
        return `This field must have a maximum of ${requiredLength} characters.`;
      }
    }
  }

  private toggleCompany() {
    // if(this.registerForm.get('company')){
    //   this.registerForm.removeControl('company')
    // }else{
    // this.registerForm.setControl('company', this.company);
    // }
    if (this.newCompany) {
      this.newCompany = false;
    } else {
      this.newCompany = true;
      this.registerForm.get('company').reset();
    }
  }

  private PasswordMatch(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('rePassword').value; // to get value in input tag
    if (AC.get('password').value !== AC.get('rePassword').value) {
      AC.get('rePassword').setErrors({ MatchPassword: true });
    } else {
      // AC.get('password').setErrors({ MatchPassword: false});
      if (AC.get('rePassword').errors) {
        delete AC.get('rePassword').errors.MatchPassword;
      }
      return null;
    }
  }
}
