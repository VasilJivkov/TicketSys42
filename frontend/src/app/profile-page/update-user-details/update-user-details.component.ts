import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { DecodedToken } from '../../models/users/DecodedToken';
import { UserInfo } from '../../models/users/user-info';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserPageService } from '../../core/user-page.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.css']
})
export class UpdateUserDetailsComponent implements OnInit {
  private updateDetailsForm: FormGroup;

  private username: AbstractControl;
  private email: AbstractControl;
  private nickname: AbstractControl;
  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private updateError: string = null;

  @Input() private requestedUser: string;
  private userInfo: UserInfo;
  
  constructor(private formBuilder: FormBuilder,
    private acRoute: ActivatedRoute,
    private userService: UserPageService,
    private router: Router) { }

  ngOnInit() {
    this.userInfo = this.acRoute.snapshot.data['object'].userInfo;

    this.updateDetailsForm = this.formBuilder.group({
      email: [this.userInfo.email, [Validators.required, Validators.email]],
      nickname: [this.userInfo.nickname || '', [Validators.minLength(3), Validators.maxLength(30)]],
      firstName: [this.userInfo.firstName || '', [Validators.minLength(3), Validators.maxLength(30)]],
      lastName: [this.userInfo.lastName || '', [Validators.minLength(3), Validators.maxLength(30)]],
    });

    this.email = this.updateDetailsForm.get('email');
    this.nickname = this.updateDetailsForm.get('nickname');
    this.firstName = this.updateDetailsForm.get('firstName');
    this.lastName = this.updateDetailsForm.get('lastName');
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

  update(updateDetailsForm: NgForm) {
    if (updateDetailsForm.valid) {
      const updateDetails = updateDetailsForm.value;
      updateDetails.infoType = 'personal details';
      updateDetails.username = this.userInfo.username;

      this.userService.updateUserInfo(updateDetails).subscribe(() => {
        // this.toastr.success(`Details successfuly updated!`);
      }, (err: HttpErrorResponse) => {
        this.updateError = 'There was a problem updating your details.';
      });
    }
  }
}
