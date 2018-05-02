import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserPageService } from '../../core/user-page.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DecodedToken } from '../../models/users/DecodedToken';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private changePasswordForm: FormGroup;
  private password: AbstractControl;
  private rePassword: AbstractControl;
  private updateError: string = null;
  
  @Input() private requestedUser: string;

  constructor(private formBuilder: FormBuilder,
    private userService: UserPageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    }, { validator: this.PasswordMatch });

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

  private PasswordMatch(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('rePassword').value; // to get value in input tag
    if (AC.get('password').value !== AC.get('rePassword').value) {
      AC.get('rePassword').setErrors({ MatchPassword: true });
    } else {
      if (AC.get('rePassword').errors) {
        delete AC.get('rePassword').errors.MatchPassword;
      }
      return null;
    }
  }

  update(changePasswordForm: NgForm) {
    if (changePasswordForm.valid) {
      const updateDetails = changePasswordForm.value;
      updateDetails.infoType = 'password';
      updateDetails.username = this.requestedUser;

      this.userService.updateUserInfo(updateDetails).subscribe(() => {
        this.toastr.success(`Password successfuly updated!`);
        this.changePasswordForm.reset();
      }, (err: HttpErrorResponse) => {
        this.updateError = 'There was a problem updating your password.';
      });
    }
  }
}
