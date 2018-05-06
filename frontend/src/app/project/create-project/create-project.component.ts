import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { IDecodedToken } from '../../models/users/DecodedToken';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  private createProjectForm: FormGroup;
  private title: AbstractControl;
  private description: AbstractControl;
  private deadline: AbstractControl;
  private createProjectError: string = null;

  private minLength = 6;
  private maxLength = 30;
  private maxDescriptionLength = 120;

  private user: IDecodedToken;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private projectService: ProjectService,
  ) {}

  public ngOnInit(): void {
    this.auth.user.subscribe((user: IDecodedToken) => this.user = user);

    this.createProjectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]],
      description: ['', [Validators.required, Validators.minLength(this.minLength), Validators.maxLength(this.maxDescriptionLength)]],
      deadline: ['', Validators.required],
    });

    this.title = this.createProjectForm.get('title');
    this.description = this.createProjectForm.get('description');
    this.deadline = this.createProjectForm.get('deadline');
  }

  public createProject(createProjectForm: NgForm): void {
    if (createProjectForm.valid) {
      const newProject = createProjectForm.value;

      this.projectService.createProject(this.user, newProject).subscribe(
        (res) => {
          console.log('successful');
          this.createProjectForm.reset();
          this.createProjectError = null;
        },
        (err: HttpErrorResponse) => {
          this.createProjectError = err.error.err;
        });
    }
  }

  public dateFilter(date: Date): boolean {
    return new Date(date) > new Date();
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

}
