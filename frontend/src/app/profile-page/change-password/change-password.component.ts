import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ProfilePageService } from '../profile-page.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  private changePasswordForm: FormGroup;
  private password: AbstractControl;
  private rePassword: AbstractControl;
  private updateError: string = null;

  private minLength = 6;
  private maxLength = 30;

  @Input() private requestedUser: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: ProfilePageService,
    public snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
    {
      password: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      rePassword: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
    },
    { validator: this.PasswordMatch });

    this.password = this.changePasswordForm.get('password');
    this.rePassword = this.changePasswordForm.get('rePassword');
  }

  private validate(inputField: AbstractControl, isSecondPassword?: boolean): string {
    if (inputField.hasError('required')) {
      return 'The field is required';
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

  private PasswordMatch(AC: AbstractControl): void {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('rePassword').value; // to get value in input tag
    if (AC.get('password').value !== AC.get('rePassword').value) {
      AC.get('rePassword').setErrors({ MatchPassword: true });
    } else {
      if (AC.get('rePassword').errors) {
        delete AC.get('rePassword').errors.MatchPassword;
      }
    }
  }

  private update(changePasswordForm: NgForm): void {
    if (changePasswordForm.valid) {
      const updateDetails = changePasswordForm.value;
      updateDetails.infoType = 'password';
      updateDetails.username = this.requestedUser;

      this.userService.updateUserInfo(updateDetails).subscribe(
      () => {
        this.openSnackBar('Password updated successfully.', 'OK');
        this.changePasswordForm.reset();
      },
      (err: HttpErrorResponse) => {
        this.updateError = 'There was a problem updating your password.';
      });
    }
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
