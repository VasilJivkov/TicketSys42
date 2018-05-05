import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth.service';
import { CompanyService } from '../../core/company.service';
import { ICompanyTitles } from '../../models/responses/company-titles';
import { IAccessToken } from '../../models/users/AccessToken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private minLength = 3;
  private minLength2 = this.minLength2;
  private maxLength = this.maxLength;

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

  private companies: string[];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private companyService: CompanyService,
    ) {}

  public ngOnInit(): void {
    this.companyService.getCompanies().subscribe((res: ICompanyTitles) => this.companies = res.companies);

    this.registerForm = this.formBuilder.group(
      {
      username: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      password: ['', [Validators.required, Validators.minLength(this.minLength2), Validators.maxLength(this.maxLength)]],
      rePassword: ['', [Validators.required, Validators.minLength(this.minLength2), Validators.maxLength(this.maxLength)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      firstName: ['', [Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      lastName: ['', [Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      company: ['', [Validators.required]],
      },
      {validator: this.PasswordMatch});

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

  private register(registerForm: NgForm): void {
      if (registerForm.valid) {
        const newUser = registerForm.value;
        delete newUser.rePassword;
        this.auth.register(registerForm.value, this.newCompany).subscribe(
          (res: IAccessToken) => {
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

  private toggleCompany(): void {
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

  private PasswordMatch(AC: AbstractControl): void {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('rePassword').value; // to get value in input tag
    if (AC.get('password').value !== AC.get('rePassword').value) {
      AC.get('rePassword').setErrors({ MatchPassword: true });
    } else {
      // AC.get('password').setErrors({ MatchPassword: false});
      if (AC.get('rePassword').errors) {
        delete AC.get('rePassword').errors.MatchPassword;
      }
    }
  }
}
