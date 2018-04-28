import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
  FormControl,
  NgForm
} from '@angular/forms';
import {
  AuthService
} from '../../core/auth.service';
import {
  ToastrService
} from 'ngx-toastr';
import { AccessToken } from '../../models/users/AccessToken';
import { HttpErrorResponse } from '@angular/common/http';

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
  private passwordMatch: boolean = false;
  private registerError: string = null;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      firstName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.minLength(3), Validators.maxLength(30)]],
    });

    this.username = this.registerForm.get('username');
    this.password = this.registerForm.get('password');
    this.rePassword = this.registerForm.get('rePassword');
    this.email = this.registerForm.get('email');
    this.nickname = this.registerForm.get('nickname');
    this.firstName = this.registerForm.get('firstName');
    this.lastName = this.registerForm.get('lastName');
  }

    register(registerForm: NgForm): void {
        if (registerForm.valid) {
            const newUser = registerForm.value;
            delete newUser.rePassword;
            this.auth.register(registerForm.value).subscribe((res: AccessToken) => {
                localStorage.setItem('access_token', res.token);
                this.registerError = null;
                this.toastr.success(`Welcome, ${this.registerForm.get('username').value}!`);
                // redirect to CompanyHomePage
            },
                (err: HttpErrorResponse) => {
                    this.registerError = err.error.err;
                });
        }
    }

  private validate(inputField: AbstractControl, isSecondPassword ? : boolean): string {
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

//   private matchPassword(inputField: FormControl) {
//       console.log('qko');
//     if (inputField.value.trim() !== this.password.value.trim()) {
//         console.log('ne staa');
//         return {
//             passwordsMatch: {
//                 valid: false,
//             }
//         }
//     } else {
//         return null;
//     }
//   }
}
